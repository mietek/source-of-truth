'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      itemId:     r.propTypes.string,
      isSpecial:  r.propTypes.bool,
      isPartial:  r.propTypes.bool,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    var isClickable = !!this.props.itemId && this.props.onSelect;
    var isSelected  = isClickable && this.props.itemId === this.props.selectedId;
    return (
      r.div({
          className: 'item' + (
            (this.props.isSpecial ? ' special' : '') +
            (this.props.isPartial ? ' partial' : '') +
            (isClickable ? ' clickable' : '') +
            (isSelected ? ' selected' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            this.props.onSelect(isSelected ? null : this.props.itemId);
          }.bind(this)
        },
        this.props.children));
  }
};

module.exports = r.makeClassFactory('GenericItem', _);
