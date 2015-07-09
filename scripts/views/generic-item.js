'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      itemId:     r.propTypes.string,
      isPartial:  r.propTypes.bool,
      isSelected: r.propTypes.bool,
      isSpecial:  r.propTypes.bool,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    var isClickable = !!this.props.itemId && this.props.onSelect;
    return (
      r.div({
          className: 'item' + (
            (this.props.isPartial ? ' partial' : '') +
            (this.props.isSelected ? ' selected' : '') +
            (this.props.isSpecial ? ' special' : '') +
            (isClickable ? ' clickable' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            this.props.onSelect(this.props.isSelected ? null : this.props.itemId);
          }.bind(this)
        },
        this.props.children));
  }
};

module.exports = r.makeClassFactory('GenericItem', _);
