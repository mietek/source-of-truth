'use strict';

/* global PDFJS */

var r = require('../common/react');
var utils = require('../common/utils');

var _ = {
  propTypes: function () {
    return {
      url: r.propTypes.string
    };
  },

  componentDidMount: function () {
    this.onPaint();
    addEventListener('resize', this.onResize);
  },

  componentWillUnmount: function () {
    removeEventListener('resize', this.onResize);
  },

  componentDidUpdate: function () {
    this.onPaint();
  },

  onResize: utils.debounce(function () {
      this.onPaint();
    }, 500),

  onPaint: function () {
    var canvas   = r.findDOMNode(this);
    var computed = getComputedStyle(canvas);
    var context  = canvas.getContext('2d');
    PDFJS.getDocument(this.props.url).then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var viewport       = page.getViewport(1);
        var width          = parseFloat(computed.width);
        var scale          = width / viewport.width;
        var scaledViewport = page.getViewport(scale * 2);
        canvas.width  = scaledViewport.width;
        canvas.height = scaledViewport.height;
        page.render({
            canvasContext: context,
            viewport:      scaledViewport
          });
      });
    });
  },

  render: function () {
    return (
      !this.props.url ? null :
        r.canvas());
  }
};

module.exports = r.makeClassFactory('Pdf', _);
