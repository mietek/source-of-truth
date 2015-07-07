'use strict';

var r = require('../common/react');

var abstract = require('./abstract');
var genericList = require('./generic-list');
var pubHeader = require('./pub-header');

var _ = {
  propTypes: function () {
    return {
      authors:                  r.propTypes.array.isRequired,
      year:                     r.propTypes.object.isRequired,
      suffix:                   r.propTypes.string,
      title:                    r.propTypes.string.isRequired,
      tags:                     r.propTypes.array,
      abstract:                 r.propTypes.string,
      citations:                r.propTypes.array,
      fullCitationCount:        r.propTypes.number,
      reverseCitations:         r.propTypes.array,
      fullReverseCitationCount: r.propTypes.number,
      isNumbered:               r.propTypes.bool,
      isPartial:                r.propTypes.bool,
      selectedId:               r.propTypes.string,
      onSelect:                 r.propTypes.func
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
            authors:    this.props.authors,
            year:       this.props.year,
            suffix:     this.props.suffix,
            title:      this.props.title,
            tags:       this.props.tags,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        abstract({
            content: this.props.abstract
          }),
        !this.props.isPartial ? null :
          r.div('section',
            r.div('spacer',
              r.span('label',
                'Full text not available'))),
        (this.props.isPartial && !this.props.citations.length) ? null :
          genericList({
              label:          'Cites',
              items:          this.props.citations,
              fullCount:      this.props.fullCitationCount,
              isNumbered:     this.props.isNumbered,
              selectedId:     this.props.selectedId,
              onSelect:       this.props.onSelect
            }),
        (!this.props.reverseCitations || !this.props.reverseCitations.length) ? null :
          genericList({
              label:          'Cited by',
              items:          this.props.reverseCitations,
              fullCount:      this.props.fullReverseCitationCount,
              selectedId:     this.props.selectedId,
              onSelect:       this.props.onSelect
            })));
  }
};

module.exports = r.makeClassFactory('PubColumn', _);
