'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var pubList = require('./pub-list');
var pubMap = require('./pub-map');

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

  render: function () {
    return (
      r.div('wrapper',
        pubMap({
            title:       this.props.title,
            authors:     this.props.authors,
            year:        this.props.year,
            collections: this.props.collections
          }),
        abstract({
            content: this.props.abstract
          }),
        pubList({
            heading:   'Cites',
            pubs:      this.props.citations,
            isSwapped: true
          }),
        pubList({
            heading:   'Cited by',
            pubs:      this.props.reverseCitations,
            isSwapped: true
          })));
  }
};

module.exports = r.makeClassFactory('Pub', _);
