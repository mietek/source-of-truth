'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var citationList = require('./citation-list');
var publicationDescription = require('./publication-description');

var _ = {
  propTypes: function () {
    return {
      name:      r.propTypes.string.isRequired,
      citations: r.propTypes.array
    };
  },

  render: function () {
    return (
      r.div('publication',
        publicationDescription({
            title:       this.props.title,
            authors:     this.props.authors,
            year:        this.props.year,
            collections: this.props.collections
          }),
        abstract({
            content: this.props.abstract
          }),
        citationList({
            heading:   'Cites',
            items:     this.props.citations,
            isSwapped: true
          }),
        citationList({
            heading:   'Cited by',
            items:     this.props.reverseCitations,
            isSwapped: true
          })));
  }
};

module.exports = r.makeClassFactory('Publication', _);
