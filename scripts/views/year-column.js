'use strict';

var r = require('../common/react');

var collectionMap = require('./collection-map');
var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      name:       r.propTypes.string.isRequired,
      pubs:       r.propTypes.array,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func.isRequired
    };
  },

  render: function () {
    return (
      r.div('wrapper',
        collectionMap({
            name:       this.props.name,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        pubList({
            heading:    'Publications',
            pubs:       this.props.pubs,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('CollectionColumn', _);
