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
      isHidden: false
    };
  },

  render: function () {
    return (
      !this.props.content ? null :
        r.div({
            key:       this.props.key,
            className: 'abstract'
          },
          r.span({
              className: 'heading',
              onClick:   function (event) {
                event.stopPropagation();
                this.setState({
                    isHidden: !this.state.isHidden
                  });
              }.bind(this)
            },
            'Abstract' +
              (this.state.isHidden ? ' …' : '')),
          this.state.isHidden ? null :
            r.div('content',
              this.props.content)));
  }
};

module.exports = r.makeClassFactory('Abstract', _);
