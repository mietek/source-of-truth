'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      title:       r.propTypes.string.isRequired,
      authors:     r.propTypes.array,
      year:        r.propTypes.number,
      collections: r.propTypes.array
    };
  },

  render: function () {
    return (
      r.div('description',
        r.span('key',
          'Title'),
        r.span('value',
          this.props.title),
        !this.props.authors ? null :
          r.span('key',
            this.props.authors.length === 1 ?
              'Author' :
              'Authors'),
        !this.props.authors ? null :
          this.props.authors.map(function (author) {
              return (
                r.span('value',
                  author.name));
            }),
        !this.props.year ? null :
          r.span('key',
            'Year'),
        !this.props.year ? null :
          r.span('value',
            this.props.year),
        !this.props.collections ? null :
          r.span('key',
            this.props.collections.length === 1 ?
              'Collection' :
              'Collections'),
        !this.props.collections ? null :
          this.props.collections.map(function (collection) {
              return (
                r.span('value',
                  collection.name));
            })));
  }
};

module.exports = r.makeClassFactory('Description', _);
