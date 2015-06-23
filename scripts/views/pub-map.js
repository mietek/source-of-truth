'use strict';

var r = require('../common/react');

var _ = {
  propTypes: function () {
    return {
      title:       r.propTypes.string.isRequired,
      authors:     r.propTypes.array,
      year:        r.propTypes.object,
      collections: r.propTypes.array
    };
  },

  render: function () {
    return (
      r.div('map',
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
          this.props.authors.map(function (author, index) {
              return (
                r.span({
                    key:       author.id + '-' + index,
                    className: 'value'
                  },
                  author.name));
            }),
        !this.props.year ? null :
          r.span('key',
            'Year'),
        !this.props.year ? null :
          r.span('value',
            this.props.year.name),
        !this.props.collections ? null :
          r.span('key',
            this.props.collections.length === 1 ?
              'Collection' :
              'Collections'),
        !this.props.collections ? null :
          this.props.collections.map(function (collection, index) {
              return (
                r.span({
                    key:       collection.id + '-' + index,
                    className: 'value'
                  },
                  collection.name));
            })));
  }
};

module.exports = r.makeClassFactory('Map', _);
