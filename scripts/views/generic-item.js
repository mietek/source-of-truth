'use strict';

var a = require('../actions');
var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      colIx:      r.propTypes.number.isRequired,
      itemId:     r.propTypes.string.isRequired,
      isPartial:  r.propTypes.bool,
      isSelected: r.propTypes.bool,
      isSpecial:  r.propTypes.bool
    };
  },

  render: function () {
    var isClickable = !!this.props.itemId;
    return (
      r.div({
          className: 'item' + (
            (this.props.isPartial ? ' partial' : '') +
            (this.props.isSelected ? ' selected' : '') +
            (this.props.isSpecial ? ' special' : '') +
            (isClickable ? ' clickable' : '')),
          onClick:   isClickable && function (event) {
            event.stopPropagation();
            a.selectItemInColumn(this.props.isSelected ? null : this.props.itemId, this.props.colIx);
          }.bind(this)
        },
        this.props.children));
  }
};

module.exports = r.makeClassFactory('GenericItem', _);
