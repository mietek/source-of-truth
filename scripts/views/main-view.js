'use strict';

var r = require('../common/react');

var _ = {
  render: function () {
    return (
      r.div());
  }
};

module.exports = r.makeClassFactory('MainView', _);
