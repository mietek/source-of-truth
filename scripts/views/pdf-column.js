'use strict';

var r = require('../common/react');

var pdf = require('./pdf');

var _ = {
  propTypes: function () {
    return {
      url: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      pdf({
          url: this.props.url
        }));
  }
};

module.exports = r.makeClassFactory('PdfColumn', _);
