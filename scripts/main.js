'use strict';

/* global PDFJS */

var r = require('./common/react');
var utils = require('./common/utils');
var browser = require('./views/browser');

PDFJS.cMapUrl = document.location.origin + '/_scripts/pdf/cmaps/';
PDFJS.cMapPacked = true;

window.main = function () {
  utils.detectHairline();
  r.render(browser(), document.getElementById('main'));
};
