'use strict';

var r = require('../common/react');

var collection = require('./collection');

var _ = {
  propTypes: function () {
    return {
      entriesById: r.propTypes.object,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func.isRequired
    };
  },

  render: function () {
    var citations = Object.keys(this.props.entriesById || {}).map(function (citationId) {
        var citation   = this.props.entriesById[citationId];
        var isSelected = citationId === this.props.selectedId;
        return {
          key:        citation.id,
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
      collection({
          name:      'Source of Truth',
          citations: citations
        }));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
