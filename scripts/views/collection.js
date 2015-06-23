'use strict';

var r = require('../common/react');

var collectionMap = require('./collection-map');
var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      name: r.propTypes.string.isRequired,
      pubs: r.propTypes.array
    };
  },

  render: function () {
    return (
      r.div('wrapper',
        collectionMap({
            name: this.props.name
          }),
        pubList({
            heading: 'Publications',
            pubs:    this.props.pubs
          })));
  }
};

module.exports = r.makeClassFactory('Collection', _);
