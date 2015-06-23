'use strict';

var r = require('../common/react');

var citationList = require('./citation-list');

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
        r.div('heading',
          this.props.name),
        citationList({
            items: this.props.citations
          })));
  }
};

module.exports = r.makeClassFactory('Collection', _);
