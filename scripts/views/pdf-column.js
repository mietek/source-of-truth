'use strict';

var r = require('../common/react');

var pdf = require('./pdf');

var _ = {
  propTypes: function () {
    return {
      basename: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.div('preview',
        pdf({
            url: document.location.origin + '/_entries/' + this.props.basename + '.pdf'
          })));
  }
};

module.exports = r.makeClassFactory('PdfColumn', _);
