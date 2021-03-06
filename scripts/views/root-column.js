'use strict';

var a = require('../actions');
var r = require('../common/react');

var genericHeader = require('./generic-header');
var genericList = require('./generic-list');

var _ = {
  propTypes: function () {
    return {
      tags:       r.propTypes.array,
      selectedId: r.propTypes.string
    };
  },

  render: function () {
    var isClickable = !!this.props.selectedId;
    var pubItems    = [{
        name:      'by author',
        id:        'by-author',
        isSpecial: true
      }, {
        name:      'by year',
        id:        'by-year',
        isSpecial: true
      }, {
        name:      'all',
        id:        'all',
        isSpecial: true
      }];
    return (
      r.div({
          className: 'wrapper' + (
            (isClickable ? ' clickable' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            a.selectItemInColumn(null, 0);
          }.bind(this)
        },
        genericHeader({
            heading: 'Source of Truth'
          }),
        genericList({
            colIx:         0,
            label:         'Tags',
            items:         this.props.tags,
            isCollapsible: false,
            isCounted:     false,
            isFiltered:    false,
            selectedId:    this.props.selectedId
          }),
        genericList({
            colIx:         0,
            label:         'Publications',
            items:         pubItems,
            isCounted:     false,
            isCollapsible: false,
            isFiltered:    false,
            selectedId:    this.props.selectedId
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
