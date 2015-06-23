'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      columnCount: r.propTypes.number.isRequired
    };
  },

  render: function () {
    return (
      r.div({
          className: 'column',
          style:     {
            width: '' + 1/this.props.columnCount * 100 + '%',
          }
        },
        this.props.children));
  }
};

module.exports = r.makeClassFactory('Column', _);
