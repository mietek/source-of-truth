'use strict';

var easeScroll = require('ease-scroll');

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var genericColumn = require('./generic-column');
var pdfColumn = require('./pdf-column');
var pubColumn = require('./pub-column');
var rootColumn = require('./root-column');

var prevToken;

var _ = {
  getInitialState: function () {
     var db = processor.processDb();
     return utils.assign({}, db, {
         path: []
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

  getColumnCount: function (state) {
    var lastId   = state.path.length && state.path[state.path.length - 1];
    var lastItem = lastId && state.itemsById[lastId];
    var hasPdf   = lastItem && lastItem.type === 'pub' && lastItem.basename;
    return (
      1 + state.path.length + (
        hasPdf ? 1 : 0));
  },

  componentDidUpdate: function (prevProps, prevState) {
    var browser     = r.findDOMNode(this);
    var columnList  = browser.firstChild;
    var columns     = columnList.childNodes;
    var prevCount   = this.getColumnCount(prevState);
    var columnCount = this.getColumnCount(this.state);
    var startX      = browser.scrollLeft;
    var token = utils.getRandomUuid();
    prevToken = token;
    var maxX;
    var i;
    if (prevCount <= columnCount) {
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
        columns[i].style.width = '' + 1/prevCount * 100 + '%';
      }
      setTimeout(function () {
          if (prevToken !== token) {
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
    var lastId   = this.state.path.length && this.state.path[this.state.path.length - 1];
    var lastItem = lastId && this.state.itemsById[lastId];
    var hasPdf   = lastItem && lastItem.type === 'pub' && lastItem.basename;
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
          !hasPdf ? null :
            r.div({
                key:       lastId + '-pdf',
                className: 'column'
              },
              pdfColumn({
                  url: document.location.origin + '/_entries/' + lastItem.basename + '.pdf'
                })))));
  }
};

module.exports = r.makeClassFactory('Browser', _);
