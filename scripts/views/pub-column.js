'use strict';

var a = require('../actions');
var r = require('../common/react');

var abstract = require('./abstract');
var genericList = require('./generic-list');
var pubHeader = require('./pub-header');

var _ = {
  propTypes: function () {
    return {
      colIx:                    r.propTypes.number.isRequired,
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
      selectedId:               r.propTypes.string
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
            a.selectItemInColumn(null, this.props.colIx);
          }.bind(this)
        },
        pubHeader({
            colIx:      this.props.colIx,
            authors:    this.props.authors,
            year:       this.props.year,
            suffix:     this.props.suffix,
            title:      this.props.title,
            tags:       this.props.tags,
            selectedId: this.props.selectedId
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
              colIx:          this.props.colIx,
              label:          'Cites',
              items:          this.props.citations,
              fullCount:      this.props.fullCitationCount,
              isCollapsible:  !!this.props.reverseCitations.length,
              isFiltered:     false,
              isNumbered:     this.props.isNumbered,
              selectedId:     this.props.selectedId
            }),
        !this.props.reverseCitations.length ? null :
          genericList({
              colIx:          this.props.colIx,
              label:          'Cited by',
              items:          this.props.reverseCitations,
              fullCount:      this.props.fullReverseCitationCount,
              isCollapsible:  false,
              isFiltered:     false,
              selectedId:     this.props.selectedId
            })));
  }
};

module.exports = r.makeClassFactory('PubColumn', _);
