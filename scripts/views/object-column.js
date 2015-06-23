'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      basename: r.propTypes.string.isRequired
    };
  },

  render: function () {
    return (
      r.div('preview',
        r.object({
            data: 'http://sourceoftruth.net/_entries/' + this.props.basename + '.pdf',
            type: 'application/pdf'
          })));
  }
};

module.exports = r.makeClassFactory('ObjectColumn', _);
