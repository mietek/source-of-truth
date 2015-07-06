'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var genericList = require('./generic-list');

var _ = {
  propTypes: function () {
    return {
      collections: r.propTypes.array,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
    };
  },

  render: function () {
    var isClickable = !!this.props.selectedId;
    return (
      r.div({
          className: 'wrapper' + (
            (isClickable ? ' clickable' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            this.props.onSelect(null);
          }.bind(this)
        },
        genericHeader({
            heading: 'Source of Truth'
          }),
        genericList({
            label:           'Collections',
            items:           this.props.collections,
            isLabelNumbered: false,
            selectedId:      this.props.selectedId,
            onSelect:        this.props.onSelect
          }),
        genericList({
            label:           'Available publications',
            items:           [{
              name: 'By signature',
              id:   'available-by-signature'
            }, {
              name: 'By author',
              id:   'available-by-author'
            }, {
              name: 'By year',
              id:   'available-by-year'
            }],
            isLabelNumbered: false,
            selectedId:      this.props.selectedId,
            onSelect:        this.props.onSelect
          }),
        genericList({
            label:           'Known publications',
            items:           [{
              name: 'By signature',
              id:   'known-by-signature'
            }, {
              name: 'By author',
              id:   'known-by-author'
            }, {
              name: 'By year',
              id:   'known-by-year'
            }],
            isLabelNumbered: false,
            selectedId:      this.props.selectedId,
            onSelect:        this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
