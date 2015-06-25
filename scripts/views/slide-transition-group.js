'use strict';

var r = require('../common/react');
var utils = require('../common/utils');

var slideTransitionGroupChild = require('./slide-transition-group-child');

var _ = {
  renderChild: function (child) {
    return (
      slideTransitionGroupChild({},
        child));
  },

  render: function () {
    return (
      r.transitionGroup(
        utils.assign({
            childFactory: this.renderChild
          }, this.props)));
  }
};

module.exports = r.makeClassFactory('SlideTransitionGroup', _);
