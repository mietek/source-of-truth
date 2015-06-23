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
    var pubs = Object.keys(this.props.entriesById || {}).map(function (pubId, index) {
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
      collection({
          name: 'Source of Truth',
          pubs: pubs
        }));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
