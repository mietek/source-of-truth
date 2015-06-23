'use strict';

var r = require('../common/react');

var collection = require('./collection');

var _ = {
  propTypes: function () {
    return {
      columnCount: r.propTypes.number.isRequired,
      entriesById: r.propTypes.object,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
    };
  },

  render: function () {
    var citations = Object.keys(this.props.entriesById || {}).map(function (citationId, citationIndex) {
        var citation   = this.props.entriesById[citationId];
        var isSelected = citationId === this.props.selectedId;
        return {
          id:         citation.id,
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
      r.div({
          className: 'column',
          key:       'root',
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onSelect(null);
          }.bind(this),
          style: {
            width: '' + 1/this.props.columnCount * 100 + '%',
          }
        },
        collection({
            name:      'Source of Truth',
            citations: citations
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
