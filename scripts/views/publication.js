'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var citationList = require('./citation-list');
var description = require('./description');

var _ = {
  propTypes: function () {
    return {
      title:            r.propTypes.string.isRequired,
      authors:          r.propTypes.array,
      year:             r.propTypes.number,
      collections:      r.propTypes.array,
      abstract:         r.propTypes.string,
      citations:        r.propTypes.array,
      reverseCitations: r.propTypes.array
    };
  },

  getInitialState: function () {
    return {
    };
  },

  render: function () {
    return (
      r.div('publication',
        description({
            title:       this.props.title,
            authors:     this.props.authors,
            year:        this.props.year,
            collections: this.props.collections
          }),
        abstract({
            content: this.props.abstract
          }),
        citationList({
            heading: 'Cites',
            items:   this.props.citations
          }),
        citationList({
            heading: 'Cited by',
            items:   this.props.reverseCitations
          })));
  }
};

module.exports = r.makeClassFactory('Publication', _);
