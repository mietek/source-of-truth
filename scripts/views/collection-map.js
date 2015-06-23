'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      name: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.div('map',
        r.span('key',
          'Collection'),
        r.span('value',
          this.props.name)));
  }
};

module.exports = r.makeClassFactory('CollectionMap', _);
