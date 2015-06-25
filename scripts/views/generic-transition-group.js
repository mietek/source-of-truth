'use strict';

var r = require('../common/react');
var utils = require('../common/utils');

var genericTransitionGroupChild = require('./generic-transition-group-child');

var _ = {
  renderChild: function (child) {
    return (
      genericTransitionGroupChild({},
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

module.exports = r.makeClassFactory('GenericTransitionGroup', _);
