'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      heading: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.div('header',
        r.span('heading',
          this.props.heading)));
  }
};

module.exports = r.makeClassFactory('GenericHeader', _);
