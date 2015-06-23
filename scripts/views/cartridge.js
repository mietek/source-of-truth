'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      title: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.span('cartridge',
        r.span('title',
          this.props.title)));
  }
};

module.exports = r.makeClassFactory('Cartridge', _);
