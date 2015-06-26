'use strict';

var easeScroll = require('ease-scroll');

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var genericColumn = require('./generic-column');
var pdfColumn = require('./pdf-column');
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
    this.setState({
        path: itemId ? basePath.concat([itemId]) : basePath
      });
  },

  renderItemColumn: function (itemId, selectedId, onSelect) {
    var item = this.state.itemsById[itemId];
    switch (item.type) {
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
        return (
          genericColumn({
              label:      'Author',
              value:      item.name,
              pubs:       item.fullPubs,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
      case 'collection':
        return (
          genericColumn({
              label:      'Collection',
              value:      item.name,
              pubs:       item.fullPubs,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
      case 'year':
        return (
          genericColumn({
              label:      'Year',
              value:      item.name,
              pubs:       item.fullPubs,
              selectedId: selectedId,
              onSelect:   onSelect
            }));
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
      document.location.origin + '/_entries/' + lastItem.basename + '.pdf');
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
                pubs:       this.state.fullPubs,
                selectedId: this.state.path.length > 0 && this.state.path[0],
                onSelect:   function (itemId) {
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
                  this.renderItemColumn(itemId, selectedId, onSelect)));
            }.bind(this)),
          !pdfUrl ? null :
            r.div({
                key:       lastId + '-pdf',
                className: 'column'
              },
              pdfColumn({
                  url: pdfUrl
                })))));
  }
};

module.exports = r.makeClassFactory('Browser', _);
