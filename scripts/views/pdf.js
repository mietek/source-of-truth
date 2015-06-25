'use strict';

/* global PDFJS */

var r = require('../common/react');
var utils = require('../common/utils');

var tokens = {};

var _ = {
  propTypes: function () {
    return {
      url: r.propTypes.string
    };
  },

  getInitialState: function () {
    return {
      pdf:         null,
      componentId: utils.getRandomUuid()
    };
  },

  componentWillMount: function () {
    var token = utils.getRandomUuid();
    tokens[this.state.componentId] = token;
    PDFJS.getDocument(this.props.url).then(function (pdf) {
        // NOTE: Abort if the component is unmounted before getDocument is done.
        if (tokens[this.state.componentId] !== token) {
          return;
        }
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
    delete tokens[this.state.componentId];
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
    var pdf         = this.state.pdf;
    var pageCount   = pdf.numPages;
    var node        = r.findDOMNode(this);
    var computed    = getComputedStyle(node);
    var width       = parseFloat(computed.width);
    var height      = parseFloat(computed.height);
    var componentId = this.state.componentId;
    var token       = utils.getRandomUuid();
    tokens[componentId] = token;
    function paintPage(pageNumber) {
      pdf.getPage(pageNumber).then(function (page) {
          // NOTE: Abort if the component is unmounted or repainted before getPage is done.
          if (tokens[componentId] !== token) {
            return;
          }
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
    while (node.childNodes.length < pageCount) {
      var child = document.createElement('canvas');
      child.width  = width;
      child.height = height;
      node.appendChild(child);
    }
    paintPage(1);
  },

  render: function () {
    return (
      r.div('pdf'));
  }
};

module.exports = r.makeClassFactory('Pdf', _);
