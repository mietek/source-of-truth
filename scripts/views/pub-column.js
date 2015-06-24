'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var pubHeader = require('./pub-header');
var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      title:            r.propTypes.string.isRequired,
      authors:          r.propTypes.array,
      year:             r.propTypes.object,
      collections:      r.propTypes.array,
      abstract:         r.propTypes.string,
      citations:        r.propTypes.array,
      reverseCitations: r.propTypes.array,
      isNumbered:       r.propTypes.bool,
      selectedId:       r.propTypes.string,
      onSelect:         r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div('wrapper',
        pubHeader({
            title:       this.props.title,
            authors:     this.props.authors,
            year:        this.props.year,
            collections: this.props.collections,
            selectedId:  this.props.selectedId,
            onSelect:    this.props.onSelect
          }),
        abstract({
            content: this.props.abstract
          }),
        pubList({
            label:      'Cites',
            pubs:       this.props.citations,
            isSwapped:  true,
            isNumbered: this.props.isNumbered,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        pubList({
            label:      'Cited by',
            pubs:       this.props.reverseCitations,
            isSwapped:  true,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('PubColumn', _);
