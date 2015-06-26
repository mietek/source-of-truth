'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      label:       r.propTypes.string.isRequired,
      value:       r.propTypes.string.isRequired,
      fullPubs:    r.propTypes.array,
      partialPubs: r.propTypes.array,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
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
            label:      'Available',
            pubs:       this.props.fullPubs,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        (!this.props.partialPubs || !this.props.partialPubs.length) ? null :
            pubList({
              label:      'Not available',
              pubs:       this.props.partialPubs,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
