'use strict';

var r = require('../common/react');

var publication = require('./publication');

var _ = {
  propTypes: function () {
    return {
      columnId:    r.propTypes.string.isRequired,
      authorsById: r.propTypes.object,
      entriesById: r.propTypes.object,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func.isRequired
    };
  },

  render: function () {
    var columnCitation = this.props.entriesById[this.props.columnId];
    var citations      = columnCitation.referenceIds && columnCitation.referenceIds.map(function (citationId, citationIndex) {
        var citation   = this.props.entriesById[citationId];
        var isSelected = citationId === this.props.selectedId;
        return {
          key:        citationId + '-' + citationIndex,
          signature:  citation.signature,
          title:      citation.title,
          isMissing:  citation.isMissing,
          isNumbered: columnCitation.isNumbered,
          isSelected: isSelected,
          onClick:    function () {
            this.props.onSelect(isSelected ? null : citationId);
          }.bind(this)
        };
      }.bind(this));
    var reverseCitations = columnCitation.reverseIds && columnCitation.reverseIds.map(function (citationId, citationIndex) {
        var citation   = this.props.entriesById[citationId];
        var isSelected = citationId === this.props.selectedId;
        return {
          key:        citationId + '-' + citationIndex,
          signature:  citation.signature,
          title:      citation.title,
          isMissing:  citation.isMissing,
          isSelected: isSelected,
          onClick:    function () {
            this.props.onSelect(isSelected ? null : citationId);
          }.bind(this)
        };
      }.bind(this));
    return (
      publication({
          title:            columnCitation.title,
          authors:          columnCitation.authorIds && columnCitation.authorIds.map(function (authorId) {
              return {
                id:   authorId,
                name: this.props.authorsById[authorId].name
              };
            }.bind(this)),
          year:             columnCitation.year,
          collections:      columnCitation.collection && [{
              id:   'TODO',
              name: columnCitation.collection
            }],
          abstract:         columnCitation.abstract,
          citations:        citations,
          reverseCitations: reverseCitations
        }));
  }
};

module.exports = r.makeClassFactory('PublicationColumn', _);
