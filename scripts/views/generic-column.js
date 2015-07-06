'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var genericList = require('./generic-list');

var _ = {
  propTypes: function () {
    return {
      heading:      r.propTypes.string.isRequired,
      items:        r.propTypes.array,
      fullItems:    r.propTypes.array,
      partialItems: r.propTypes.array,
      selectedId:   r.propTypes.string,
      onSelect:     r.propTypes.func
    };
  },

  render: function () {
    var isClickable = !!this.props.selectedId;
    var hasAll      = this.props.items && this.props.items.length;
    var hasFull     = this.props.fullItems && this.props.fullItems.length;
    var hasPartial  = this.props.partialItems && this.props.partialItems.length;
    return (
      r.div({
          className: 'wrapper' + (
            (isClickable ? ' clickable' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            this.props.onSelect(null);
          }.bind(this)
        },
        genericHeader({
            heading:    this.props.heading
          }),
        !hasAll ? null :
            genericList({
              label:      'publications',
              items:      this.props.items,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            }),
        !hasFull ? null :
            genericList({
              label:      'available',
              items:      this.props.fullItems,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            }),
        !hasPartial ? null :
            genericList({
              label:      'not available',
              items:      this.props.partialItems,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
