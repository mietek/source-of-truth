'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');

var _ = {
  propTypes: function () {
    return {
      title:       r.propTypes.string.isRequired,
      authors:     r.propTypes.array,
      year:        r.propTypes.object,
      collections: r.propTypes.array,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div('header',
        r.div('heading',
          this.props.title),
        !this.props.authors ? null :
          this.props.authors.map(function (author, index) {
              return (
                genericItem({
                    key:        author.id + '-' + index,
                    itemId:     author.id,
                    isPartial:  author.isPartial,
                    selectedId: this.props.selectedId,
                    onSelect:   this.props.onSelect
                  },
                  index ? null :
                    r.span('label',
                      this.props.authors.length === 1 ? 'Author' : 'Authors'),
                  r.span('value',
                    author.fullName)));
            }.bind(this)),
        !this.props.year ? null :
          genericItem({
              itemId:     this.props.year.id,
              isPartial:  this.props.year.isPartial,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            },
            r.span('label',
              'Year'),
            r.span('value',
              this.props.year.name)),
        !this.props.collections ? null :
          this.props.collections.map(function (collection, index) {
              return (
                genericItem({
                    key:        collection.id + '-' + index,
                    itemId:     collection.id,
                    isPartial:  collection.isPartial,
                    selectedId: this.props.selectedId,
                    onSelect:   this.props.onSelect
                  },
                  index ? null :
                    r.span('label',
                      this.props.collections.length === 1 ? 'Collection' : 'Collections'),
                  r.span('value',
                    collection.name)));
            }.bind(this))));
  }
};

module.exports = r.makeClassFactory('PubHeader', _);
