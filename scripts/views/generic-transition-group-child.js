'use strict';

var r = require('../common/react');

// NOTE: TRANSITION_DURATION must match $transition-duration in CSS
var TRANSITION_DURATION = 250;
var TICK = 5;

var _ = {
  propTypes: function () {
    return {
      transitionName:  r.propTypes.string.isRequired,
      transitionEnter: r.propTypes.bool,
      transitionLeave: r.propTypes.bool
    };
  },

  getDefaultProps: function () {
    return {
      transitionName:  'height',
      transitionEnter: true,
      transitionLeave: false
    };
  },

  componentWillEnter: function (done) {
    switch (this.props.transitionName) {
      case 'height':
        var node   = r.findDOMNode(this);
        var height = getComputedStyle(node).getPropertyValue('height');
        node.classList.add('height-enter');
        node.style.maxHeight = '0px';
        setTimeout(function () {
            node.classList.add('height-enter-active');
            node.style.maxHeight = height;
            setTimeout(function () {
                node.classList.remove('height-enter');
                node.classList.remove('height-enter-active');
                node.style.maxHeight = null;
                done();
              }, TRANSITION_DURATION);
          }, TICK);
        break;
    }
  },

  componentWillLeave: function (done) {
    switch (this.props.transitionName) {
      case 'height':
        var node   = r.findDOMNode(this);
        var height = getComputedStyle(node).getPropertyValue('height');
        node.classList.add('height-leave');
        node.style.maxHeight = height;
        setTimeout(function () {
            node.classList.add('height-leave-active');
            node.style.maxHeight = '0px';
            setTimeout(function () {
                node.classList.remove('height-leave');
                node.classList.remove('height-leave-active');
                node.style.maxHeight = null;
                done();
              }, TRANSITION_DURATION);
          }, TICK);
        break;
    }
  },

  render: function () {
    return r.childrenOnly(this.props.children);
  }
};

module.exports = r.makeClassFactory('GenericTransitionGroupChild', _);
