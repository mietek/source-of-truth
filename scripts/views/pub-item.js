'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      id:         r.propTypes.string.isRequired,
      signature:  r.propTypes.string.isRequired,
      title:      r.propTypes.string.isRequired,
      isNumbered: r.propTypes.bool,
      isMissing:  r.propTypes.bool,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func.isRequired
    };
  },

  render: function () {
    var isSelected = (
      this.props.id === this.props.selectedId);
    return (
      r.div({
          className: 'pub-item' + (
            (this.props.isNumbered ? ' numbered' : '') +
            (isSelected ? ' selected' : '') +
            (this.props.isMissing ? ' missing' : '')),
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onSelect(isSelected ? null : this.props.id);
          }.bind(this)
        },
        r.span('signature',
          this.props.signature),
        r.span('title',
          this.props.title)));
  }
};

module.exports = r.makeClassFactory('PubItem', _);
