'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      pubId:      r.propTypes.string.isRequired,
      authors:    r.propTypes.array.isRequired,
      year:       r.propTypes.object.isRequired,
      suffix:     r.propTypes.string,
      title:      r.propTypes.string.isRequired,
      isSelected: r.propTypes.bool,
      isPartial:  r.propTypes.bool,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div({
          className: 'item clickable' + (
            (this.props.isPartial ? ' partial' : '') +
            (this.props.isSelected ? ' selected' : '')),
          onClick:   function (event) {
            event.stopPropagation();
            this.props.onSelect(this.props.isSelected ? null : this.props.pubId);
          }.bind(this)
        },
        r.span('key',
          !this.props.authors[0].isUnknown ?
            r.span('author',
              this.props.authors[0].name) :
            r.span('special author',
              'u.'),
          r.span({}, ' '),
          !this.props.year.isUnknown ?
            r.span('year',
              this.props.year.name) :
            r.span('special year',
              'u.'),
          !(this.props.year.isUnknown && this.props.suffix) ? null :
            r.span({}, ' '),
          !this.props.suffix ? null :
            r.span('suffix',
              this.props.suffix)),
        r.span('title',
          this.props.title)));
  }
};

module.exports = r.makeClassFactory('PubItem', _);
