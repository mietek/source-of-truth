'use strict';

var easeScroll = require('ease-scroll');

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var genericColumn = require('./generic-column');
var pdf = require('./pdf');
var pubColumn = require('./pub-column');
var rootColumn = require('./root-column');

var tokens = {};

var _ = {
  getInitialState: function () {
     var db = processor.processDb();
     return utils.assign({}, db, {
         path:        [],
         componentId: utils.getRandomUuid()
       });
  },

  select: function (basePath, itemId) {
    var path = itemId ? basePath.concat([itemId]) : basePath;
    var hash = '#' + path.join(':');
    this.setState({
        path: path
      });
    history.pushState({
        path: path
      }, '', hash);
  },

  componentDidMount: function () {
    var path = location.hash ? location.hash.slice(1).split(':') : [];
    this.setState({
        path: path
      });
    addEventListener('popstate', this.onPopState);
  },

  componentWillUnmount: function () {
    removeEventListener('popstate', this.onPopState);
  },

  onPopState: function (event) {
    if (event.state) {
      var path = event.state.path || [];
      this.setState({
          path: path
        });
    }
  },

  renderColumn: function (itemId, selectedId, onSelect) {
    switch (itemId) {
      case 'p':
        return (
          genericColumn({
              heading:      'All publications',
              fullItems:    this.state.fullPubs,
              partialItems: this.state.partialPubs,
              selectedId:   selectedId,
              onSelect:     onSelect
            }));
      case 'a':
        return (
          genericColumn({
              heading:      'All authors',
              fullItems:    this.state.fullAuthors,
              partialItems: this.state.partialAuthors,
              selectedId:   selectedId,
              onSelect:     onSelect
            }));
      case 'y':
        return (
          genericColumn({
              heading:      'All years',
              fullItems:    this.state.fullYears,
              partialItems: this.state.partialYears,
              selectedId:   selectedId,
              onSelect:     onSelect
            }));
    }
    var item     = this.state.itemsById[itemId];
    var itemType = item && item.type;
    switch (itemType) {
      case 'pub':
        return (
          pubColumn({
              title:            item.title,
              authors:          item.authors,
              year:             item.year,
              collections:      item.collections,
              abstract:         item.abstract,
              citations:        item.citations,
              reverseCitations: item.reverseCitations,
              isNumbered:       item.isNumbered,
              isPartial:        item.isPartial,
              selectedId:       selectedId,
              onSelect:         onSelect
            }));
      case 'author':
      case 'collection':
      case 'year':
        return (
          genericColumn({
              heading:      item.name,
              fullItems:    item.fullPubs,
              partialItems: item.partialPubs,
              selectedId:   selectedId,
              onSelect:     onSelect
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
      lastItem.basename &&
      document.location.origin + '/_pubs/' + lastItem.basename + '.pdf');
  },

  getColumnCount: function (state) {
    var hasPdf = !!this.getPdfUrl(state);
    return (
      1 + state.path.length + (
        hasPdf ? 1 : 0));
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
    easeScroll.tween(startX, maxX, maxX, 500, function (x) {
        browser.scrollLeft = x;
      });
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
                collections: this.state.collections,
                selectedId:  this.state.path.length > 0 && this.state.path[0],
                onSelect:    function (itemId) {
                  this.select([], itemId);
                }.bind(this)
              })),
          this.state.path.map(function (itemId, index) {
              var basePath   = this.state.path.slice(0, index + 1);
              var selectedId = this.state.path.length > (index + 1) && this.state.path[index + 1];
              var onSelect   = function (itemId) {
                  this.select(basePath, itemId);
                }.bind(this);
              return (
                r.div({
                    key:       itemId + '-' + index,
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
