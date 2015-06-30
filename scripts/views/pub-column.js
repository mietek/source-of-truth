'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var genericList = require('./generic-list');
var pubHeader = require('./pub-header');

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
      isPartial:        r.propTypes.bool,
      selectedId:       r.propTypes.string,
      onSelect:         r.propTypes.func
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
        genericList({
            label:          'Cites',
            items:          this.props.citations,
            isLabelSwapped: true,
            isNumbered:     this.props.isNumbered,
            selectedId:     this.props.selectedId,
            onSelect:       this.props.onSelect
          }),
        (!this.props.reverseCitations || !this.props.reverseCitations.length) ? null :
          genericList({
              label:          'Cited by',
              items:          this.props.reverseCitations,
              isLabelSwapped: true,
              selectedId:     this.props.selectedId,
              onSelect:       this.props.onSelect
            }),
        !this.props.isPartial ? null :
          r.div('section',
            r.div('spacer',
              r.span('label',
                'Full text not available')))));
  }
};

module.exports = r.makeClassFactory('PubColumn', _);
