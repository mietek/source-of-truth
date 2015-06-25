'use strict';

var r = require('../common/react');

// NOTE: SLIDE_DURATION must match $slide-duration in CSS
var SLIDE_DURATION = 250;
var TICK = 5;

var _ = {
  componentWillEnter: function (done) {
    var node   = r.findDOMNode(this);
    var height = getComputedStyle(node).getPropertyValue('height');
    node.classList.add('slide-enter');
    node.style.maxHeight = '0px';
    setTimeout(function () {
        node.classList.add('slide-enter-active');
        node.style.maxHeight = height;
        setTimeout(function () {
            node.classList.remove('slide-enter');
            node.classList.remove('slide-enter-active');
            node.style.maxHeight = null;
            done();
          }, SLIDE_DURATION);
      }, TICK);
  },

  componentWillLeave: function (done) {
    var node   = r.findDOMNode(this);
    var height = getComputedStyle(node).getPropertyValue('height');
    node.classList.add('slide-leave');
    node.style.maxHeight = height;
    setTimeout(function () {
        node.classList.add('slide-leave-active');
        node.style.maxHeight = '0px';
        setTimeout(function () {
            node.classList.remove('slide-leave');
            node.classList.remove('slide-leave-active');
            node.style.maxHeight = null;
            done();
          }, SLIDE_DURATION);
      }, TICK);
  },

  render: function () {
    return r.childrenOnly(this.props.children);
  }
};

module.exports = r.makeClassFactory('SlideTransitionGroupChild', _);
