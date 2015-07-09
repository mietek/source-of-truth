'use strict';

var easeScroll = require('ease-scroll');

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var genericColumn = require('./generic-column');
var pdf = require('./pdf');
var pubColumn = require('./pub-column');
var rootColumn = require('./root-column');

var selectionActions = require('../actions/selection-actions');
var selectionStore = require('../stores/selection-store');

var tokens = {};

var _ = {
  getInitialState: function () {
    var database    = processor.processDatabase();
    var path        = selectionStore.getPath();
    var componentId = utils.getRandomUuid();
    return utils.assign({}, database, {
        path:        path,
        componentId: componentId
      });
  },

  select: function (base, itemId) {
    var path = itemId ? base.concat([itemId]) : base;
    var hash = utils.encodePath(path);
    selectionActions.setPath(path);
    history.pushState({
        path: path
      }, '', hash);
  },

  onPublish: function () {
    this.setState({
        path: selectionStore.getPath()
      });
  },

  renderColumn: function (itemId, selectedId, onSelect) {
    switch (itemId) {
      case 'by-key':
        return (
          genericColumn({
              heading:    'by key',
              items:      this.state.pubs.all,
              fullCount:  this.state.pubs.fullCount,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
      case 'by-author':
        return (
          genericColumn({
              heading:    'by author',
              items:      this.state.authors.all,
              fullCount:  this.state.authors.fullCount,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
      case 'by-year':
        return (
          genericColumn({
              heading:    'by year',
              items:      this.state.years.all,
              fullCount:  this.state.years.fullCount,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
    }
    var item     = this.state.itemsById[itemId];
    var itemType = item && item.type;
    switch (itemType) {
      case 'pub':
        return (
          pubColumn({
              authors:                  item.authors,
              year:                     item.year,
              title:                    item.title,
              suffix:                   item.suffix,
              tags:                     item.tags,
              abstract:                 item.abstract,
              citations:                item.citations,
              fullCitationCount:        item.fullCitationCount,
              reverseCitations:         item.reverseCitations,
              fullReverseCitationCount: item.fullReverseCitationCount,
              isNumbered:               item.isNumbered,
              isPartial:                item.isPartial,
              selectedId:               selectedId,
              onSelect:                 onSelect
            }));
      case 'tag':
      case 'author':
      case 'year':
        return (
          genericColumn({
              heading:    itemType === 'author' ? item.fullName : item.name, // TODO: Ugh
              items:      item.pubs,
              fullCount:  item.fullCount,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
      default:
        return (
          r.div('wrapper',
            r.div('section',
              r.span('label',
                'Missing item'))));
    }
  },

  getLastId: function (state) {
    return (
      state &&
      state.path &&
      state.path.length &&
      state.path[state.path.length - 1]);
  },

  getLastItem: function (state) {
    var lastId = this.getLastId(state);
    return (
      lastId &&
      state.itemsById[lastId]);
  },

  getPdfUrl: function (state) {
    var lastItem = this.getLastItem(state);
    return (
      lastItem &&
      lastItem.type === 'pub' &&
      !lastItem.isPartial &&
      document.location.origin + '/_pubs/' + lastItem.id + '.pdf');
  },

  getColumnCount: function (state) {
    var hasPdf = !!this.getPdfUrl(state);
    return (
      1 + ((state && state.path) ? state.path.length : 0) + (
        hasPdf ? 1 : 0));
  },

  componentDidMount: function () {
    selectionStore.subscribe(this.onPublish);
    this.componentDidUpdate(null, null);
  },

  componentWillUnmount: function () {
    selectionStore.unsubscribe(this.onPublish);
  },

  componentDidUpdate: function (prevProps, prevState) {
    var browser         = r.findDOMNode(this);
    var columnList      = browser.firstChild;
    var columns         = columnList.childNodes;
    var prevColumnCount = this.getColumnCount(prevState);
    var columnCount     = this.getColumnCount(this.state);
    var startX          = browser.scrollLeft;
    var componentId     = this.state.componentId;
    var token           = utils.getRandomUuid();
    tokens[componentId] = token;
    var maxX;
    var i;
    if (prevColumnCount <= columnCount) {
      columnList.style.width = '' + columnCount/3 * 100 + '%';
      for (i = 0; i < columns.length; i += 1) {
        columns[i].style.width = '' + 1/columnCount * 100 + '%';
      }
      maxX = browser.scrollWidth - browser.clientWidth;
    } else {
      var browserWidth = parseFloat(getComputedStyle(browser).getPropertyValue('width'));
      var columnWidth  = browserWidth/3;
      var scrollWidth  = columnCount * columnWidth;
      for (i = 0; i < columns.length; i += 1) {
        columns[i].style.width = '' + 1/prevColumnCount * 100 + '%';
      }
      setTimeout(function () {
          if (tokens[componentId] !== token) {
            return;
          }
          columnList.style.width = '' + columnCount/3 * 100 + '%';
          for (var i = 0; i < columns.length; i += 1) {
            columns[i].style.width = '' + 1/columnCount * 100 + '%';
          }
        }, 500);
      maxX = scrollWidth - browser.clientWidth;
    }
    if (prevState && prevState.path) {
      easeScroll.tween(startX, maxX, maxX, 500, function (x) {
          browser.scrollLeft = x;
        });
    } else {
      browser.scrollLeft = maxX;
    }
  },

  render: function () {
    var lastId = this.getLastId(this.state);
    var pdfUrl = this.getPdfUrl(this.state);
    return (
      r.div('browser',
        r.div('column-list',
          r.div({
              key:       'root',
              className: 'column'
            },
            rootColumn({
                tags:       this.state.tags.all,
                selectedId: this.state.path && this.state.path.length > 0 && this.state.path[0],
                onSelect:   function (itemId) {
                  this.select([], itemId);
                }.bind(this)
              })),
          (this.state.path || []).map(function (itemId, colIx) {
              var base       = this.state.path.slice(0, colIx + 1);
              var selectedId = this.state.path.length > (colIx + 1) && this.state.path[colIx + 1];
              var onSelect   = function (itemId) {
                  this.select(base, itemId);
                }.bind(this);
              return (
                r.div({
                    key:       itemId + '-' + (colIx + 1),
                    className: 'column'
                  },
                  this.renderColumn(itemId, selectedId, onSelect)));
            }.bind(this)),
          !pdfUrl ? null :
            r.div({
                key:       lastId + '-pdf',
                className: 'column'
              },
              pdf({
                  url: pdfUrl
                })))));
  }
};

module.exports = r.makeClassFactory('Browser', _);
