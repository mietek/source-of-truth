'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      id:         r.propTypes.string.isRequired,
      signature:  r.propTypes.string.isRequired,
      title:      r.propTypes.string.isRequired,
      isNumbered: r.propTypes.bool,
      isSelected: r.propTypes.bool,
      isMissing:  r.propTypes.bool,
      onClick:    r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div({
          className: 'pub-list-item' + (
            (this.props.isNumbered ? ' numbered' : '') +
            (this.props.isSelected ? ' selected' : '') +
            (this.props.isMissing ? ' missing' : '')),
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onClick();
          }.bind(this)
        },
        r.span('signature',
          this.props.signature),
        r.span('title',
          this.props.title)));
  }
};

module.exports = r.makeClassFactory('PubListItem', _);
