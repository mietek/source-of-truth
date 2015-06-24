'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      pubId:       r.propTypes.string.isRequired,
      signature:   r.propTypes.string.isRequired,
      title:       r.propTypes.string.isRequired,
      isPartial:   r.propTypes.bool,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
    };
  },

  render: function () {
    var isSelected = this.props.pubId === this.props.selectedId;
    return (
      r.div({
          className: 'item clickable' + (
            (this.props.isPartial ? ' partial' : '') +
            (isSelected ? ' selected' : '')),
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onSelect(isSelected ? null : this.props.pubId);
          }.bind(this)
        },
        r.span('signature',
          this.props.signature),
        r.span('title',
          this.props.title)));
  }
};

module.exports = r.makeClassFactory('PubItem', _);
