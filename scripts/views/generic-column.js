'use strict';

var a = require('../actions');
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
      selectedId: r.propTypes.string
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
            a.selectItemInColumn(null, this.props.colIx);
          }.bind(this)
        },
        genericHeader({
            heading: this.props.heading
          }),
        !hasItems ? null :
            genericList({
              colIx:         this.props.colIx,
              items:         this.props.items,
              fullCount:     this.props.fullCount,
              isCollapsible: false,
              selectedId:    this.props.selectedId
            })));
  }
};

module.exports = r.makeClassFactory('GenericColumn', _);
