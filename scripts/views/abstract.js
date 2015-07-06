'use strict';

var r = require('../common/react');

var genericTransitionGroup = require('./generic-transition-group');

var _ = {
  propTypes: function () {
    return {
      content: r.propTypes.string
    };
  },

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  render: function () {
    if (!this.props.content) {
      return null;
    }
    return (
      r.div('abstract' + (
          (this.state.isHidden ? ' hidden' : '')),
        r.div('spacer',
          r.span({
            className: 'label clickable',
            onClick:   function (event) {
              event.stopPropagation();
              this.setState({
                  isHidden: !this.state.isHidden
                });
            }.bind(this)
          },
          'Abstract')),
        genericTransitionGroup({
            transitionName: 'height'
          },
          this.state.isHidden ? null :
            r.div({
                key:       'abstract',
                className: 'content',
                dangerouslySetInnerHTML: {
                  __html: this.props.content
                }
              }))));
  }
};

module.exports = r.makeClassFactory('Abstract', _);
