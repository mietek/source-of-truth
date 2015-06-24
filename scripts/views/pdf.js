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

  getInitialState: function () {
    return {
      pdf: null
    };
  },

  componentWillMount: function () {
    PDFJS.getDocument(this.props.url).then(function (pdf) {
        this.setState({
            pdf: pdf
          });
      }.bind(this));
  },

  componentDidMount: function () {
    addEventListener('resize', this.onResize);
    this.onPaint();
  },

  componentWillUnmount: function () {
    removeEventListener('resize', this.onResize);
    var node = r.findDOMNode(this);
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  },

  componentDidUpdate: function () {
    this.onPaint();
  },

  onResize: utils.debounce(function () {
      this.onPaint();
    }, 500),

  onPaint: function () {
    if (!this.state.pdf) {
      return;
    }
    var pdf       = this.state.pdf;
    var pageCount = pdf.numPages;
    var node      = r.findDOMNode(this);
    var computed  = getComputedStyle(node);
    var width     = parseFloat(computed.width);
    var height    = parseFloat(computed.height);
    while (node.childNodes.length < pageCount) {
      var child = document.createElement('canvas');
      child.width  = width;
      child.height = height;
      node.appendChild(child);
    }
    function paintPage(pageNumber) {
      pdf.getPage(pageNumber).then(function (page) {
          var viewport = page.getViewport(1);
          var scale    = width / viewport.width;
          var scaled   = page.getViewport(scale * 2);
          for (var i = pageNumber - 1; i < pageCount; i += 1) {
            var child = node.childNodes[i];
            child.width  = scaled.width;
            child.height = scaled.height;
          }
          var canvas  = node.childNodes[pageNumber - 1];
          var context = canvas.getContext('2d');
          page.render({
              canvasContext: context,
              viewport:      scaled
            }).promise.then(function () {
                if (pageNumber < pageCount) {
                  paintPage(pageNumber + 1);
                }
              });
        });
    }
    paintPage(1);
  },

  render: function () {
    return (
      r.div('pdf'));
  }
};

module.exports = r.makeClassFactory('Pdf', _);
