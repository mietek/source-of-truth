'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      label: r.propTypes.string.isRequired,
      value: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.div('header',
        r.div('heading',
          r.span('label',
            this.props.label),
          r.span('value',
            this.props.value))));
  }
};

module.exports = r.makeClassFactory('GenericHeader', _);
