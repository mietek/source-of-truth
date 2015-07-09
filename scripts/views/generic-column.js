'use strict';

var r = require('../common/react');

var genericHeader = require('./generic-header');
var genericList = require('./generic-list');

var _ = {
  propTypes: function () {
    return {
      colIx:      r.propTypes.number.isRequired,
      heading:    r.propTypes.string.isRequired,
      items:      r.propTypes.array,
      fullCount:  r.propTypes.number,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    var isClickable = !!this.props.selectedId;
    var hasItems    = this.props.items && this.props.items.length;
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
            heading: this.props.heading
          }),
        !hasItems ? null :
            genericList({
              items:      this.props.items,
              fullCount:  this.props.fullCount,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
