'use strict';

var easeScroll = require('ease-scroll');

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var column = require('./column');
var genericColumn = require('./generic-column');
var pdfColumn = require('./pdf-column');
var pubColumn = require('./pub-column');
var rootColumn = require('./root-column');

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

  componentDidUpdate: function () {
    var node   = r.findDOMNode(this);
    var startX = node.scrollLeft;
    var maxX   = node.scrollWidth - node.clientWidth;
    easeScroll.tween(startX, maxX, maxX, 500, function (x) {
        node.scrollLeft = x;
      });
  },

  render: function () {
    var lastId      = this.state.path.length && this.state.path[this.state.path.length - 1];
    var lastItem    = lastId && this.state.itemsById[lastId];
    var hasPdf      = lastItem && lastItem.type === 'pub' && lastItem.basename;
    var columnCount = (
      1 + this.state.path.length + (
        hasPdf ? 1 : 0));
    return (
      r.div('browser',
        r.div({
            className: 'column-list',
            style: {
              width: '' + columnCount/3 * 100 + '%',
            }
          },
          column({
              columnCount: columnCount
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
                column({
                    key:         itemId + '-' + index,
                    columnCount: columnCount
                  },
                  this.renderItemColumn(itemId, selectedId, onSelect)));
            }.bind(this)),
          !hasPdf ? null :
            column({
                columnCount: columnCount
              },
              pdfColumn({
                  key: lastId,
                  url: document.location.origin + '/_entries/' + lastItem.basename + '.pdf'
                })))));
  }
};

module.exports = r.makeClassFactory('Browser', _);
