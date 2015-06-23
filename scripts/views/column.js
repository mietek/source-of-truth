'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      columnCount: r.propTypes.number.isRequired,
      isDouble:    r.propTypes.bool
    };
  },

  render: function () {
    var width = (
      !this.props.isDouble ?
        1/this.props.columnCount :
        2/this.props.columnCount);
    return (
      r.div({
          className: 'column',
          style:     {
            width: '' + width * 100 + '%',
          }
        },
        this.props.children));
  }
};

module.exports = r.makeClassFactory('Column', _);
