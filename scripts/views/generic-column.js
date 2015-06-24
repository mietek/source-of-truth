'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      label:      r.propTypes.string.isRequired,
      value:      r.propTypes.string.isRequired,
      pubs:       r.propTypes.array,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div('wrapper',
        genericHeader({
            label:      this.props.label,
            value:      this.props.value,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        pubList({
            pubs:       this.props.pubs,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
