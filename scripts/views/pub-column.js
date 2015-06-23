'use strict';

var r = require('../common/react');

var pub = require('./pub');

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
    var columnPub = this.props.entriesById[this.props.columnId];
    var citations = columnPub.referenceIds && columnPub.referenceIds.map(function (pubId, index) {
        var pub        = this.props.entriesById[pubId];
        var isSelected = pubId === this.props.selectedId;
        return {
          key:        pubId + '-' + index,
          signature:  pub.signature,
          title:      pub.title,
          isMissing:  pub.isMissing,
          isNumbered: columnPub.isNumbered,
          isSelected: isSelected,
          onClick:    function () {
            this.props.onSelect(isSelected ? null : pubId);
          }.bind(this)
        };
      }.bind(this));
    var reverseCitations = columnPub.reverseIds && columnPub.reverseIds.map(function (pubId, index) {
        var pub        = this.props.entriesById[pubId];
        var isSelected = pubId === this.props.selectedId;
        return {
          key:        pubId + '-' + index,
          signature:  pub.signature,
          title:      pub.title,
          isMissing:  pub.isMissing,
          isSelected: isSelected,
          onClick:    function () {
            this.props.onSelect(isSelected ? null : pubId);
          }.bind(this)
        };
      }.bind(this));
    return (
      pub({
          title:            columnPub.title,
          authors:          columnPub.authorIds && columnPub.authorIds.map(function (authorId) {
              return {
                id:   authorId,
                name: this.props.authorsById[authorId].name
              };
            }.bind(this)),
          year:             columnPub.year,
          collections:      columnPub.collection && [{
              id:   'TODO',
              name: columnPub.collection
            }],
          abstract:         columnPub.abstract,
          citations:        citations,
          reverseCitations: reverseCitations
        }));
  }
};

module.exports = r.makeClassFactory('PubColumn', _);
