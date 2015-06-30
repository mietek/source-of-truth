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
            heading:    'Source of Truth'
          }),
        genericList({
            label:      'collections',
            items:      this.props.collections,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        genericList({
            label:           'Indices',
            items:           [{
              id:   'p',
              name: 'All publications'
            }, {
              id:   'a',
              name: 'All authors'
            }, {
              id:   'y',
              name: 'All years'
            }],
            isLabelNumbered: false,
            selectedId:      this.props.selectedId,
            onSelect:        this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
