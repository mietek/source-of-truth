'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var genericList = require('./generic-list');

var _ = {
  propTypes: function () {
    return {
      heading:      r.propTypes.string.isRequired,
      fullItems:    r.propTypes.array,
      partialItems: r.propTypes.array,
      selectedId:   r.propTypes.string,
      onSelect:     r.propTypes.func
    };
  },

  render: function () {
    var hasPartials = (
      this.props.partialItems &&
      this.props.partialItems.length);
    return (
      r.div({
          className: 'wrapper',
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onSelect(null);
          }.bind(this)
        },
        genericHeader({
            heading:    this.props.heading
          }),
        genericList({
            label:      'available',
            items:      this.props.fullItems,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          }),
        !hasPartials ? null :
            genericList({
              label:      'not available',
              items:      this.props.partialItems,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
