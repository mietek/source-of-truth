'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      content: r.propTypes.string
    };
  },

  getInitialState: function () {
    return {
      isCollapsed: false
    };
  },

  render: function () {
    if (!this.props.content) {
      return null;
    }
    return (
      r.div('abstract' + (
          (this.state.isCollapsed ? ' collapsed' : '')),
        r.div('spacer',
          r.span({
            className: 'collapsing label clickable',
            onClick:   function (event) {
              event.stopPropagation();
              this.setState({
                  isCollapsed: !this.state.isCollapsed
                });
            }.bind(this)
          },
          'Abstract')),
        this.state.isCollapsed ? null :
          r.div({
              className: 'content',
              dangerouslySetInnerHTML: {
                __html: this.props.content
              }
            })));
  }
};

module.exports = r.makeClassFactory('Abstract', _);
