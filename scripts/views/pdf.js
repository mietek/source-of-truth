'use strict';

/* global PDFJS */

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      url: r.propTypes.string
    };
  },

  componentDidMount: function () {
    this.renderFirstPage();
  },

  componentDidUpdate: function () {
    this.renderFirstPage();
  },

  renderFirstPage: function () {
    var canvas  = this.getDOMNode();
    var context = canvas.getContext('2d');
    PDFJS.getDocument(this.props.url).then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var viewport       = page.getViewport(1);
        var desiredWidth   = parseFloat(getComputedStyle(canvas).width);
        var scale          = desiredWidth / viewport.width;
        var scaledViewport = page.getViewport(scale);
        canvas.height = scaledViewport.height;
        canvas.width  = scaledViewport.width;
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
