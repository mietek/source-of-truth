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
    return (
      r.div('wrapper',
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
              id:   'pubs',
              name: 'All publications'
            }, {
              id:   'authors',
              name: 'All authors'
            }, {
              id:   'years',
              name: 'All years'
            }],
            isLabelNumbered: false,
            selectedId:      this.props.selectedId,
            onSelect:        this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
