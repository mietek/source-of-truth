'use strict';

var http = require('./common/http');
var react = require('./common/react');
var actions = require('./actions');
var browser = require('./views/browser');

PDFJS.cMapUrl = document.location.origin + '/_scripts/pdf/cmaps/';
PDFJS.cMapPacked = true;

window.main = function () {
  react.render(browser(), document.getElementById('main'));
};
