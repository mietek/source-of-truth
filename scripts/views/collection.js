'use strict';

var r = require('../common/react');

var citationList = require('./citation-list');
var collectionDescription = require('./collection-description');

var _ = {
  propTypes: function () {
    return {
      name:      r.propTypes.string.isRequired,
      citations: r.propTypes.array
    };
  },

  render: function () {
    return (
      r.div('collection',
        collectionDescription({
            name: this.props.name
          }),
        citationList({
            heading: 'Publications',
            items:   this.props.citations
          })));
  }
};

module.exports = r.makeClassFactory('Collection', _);
