'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      name:       r.propTypes.string.isRequired,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func.isRequired
    };
  },

  render: function () {
    return (
      r.div('map',
        r.span('key',
          'Year'),
        r.span('value',
          this.props.name)));
  }
};

module.exports = r.makeClassFactory('YearMap', _);
