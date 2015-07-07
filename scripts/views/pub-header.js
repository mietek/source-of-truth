'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');

var _ = {
  propTypes: function () {
    return {
      signature:   r.propTypes.string.isRequired,
      title:       r.propTypes.string.isRequired,
      authors:     r.propTypes.array,
      year:        r.propTypes.object,
      tags:        r.propTypes.array,
      selectedId:  r.propTypes.string,
      onSelect:    r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div('header',
        r.div('heading',
          this.props.signature + ' — ' + this.props.title),
        !this.props.authors ? null :
          this.props.authors.map(function (author, index) {
              return (
                genericItem({
                    key:        author.id + '-' + index,
                    itemId:     author.id,
                    isSpecial:  author.isUnknown,
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
              isSpecial:  this.props.year.isUnknown,
              isPartial:  this.props.year.isPartial,
              selectedId: this.props.selectedId,
              onSelect:   this.props.onSelect
            },
            r.span('label',
              'Year'),
            r.span('value',
              this.props.year.name)),
        !this.props.tags ? null :
          this.props.tags.map(function (tag, index) {
              return (
                genericItem({
                    key:        tag.id + '-' + index,
                    itemId:     tag.id,
                    isSpecial:  tag.isUntagged,
                    isPartial:  tag.isPartial,
                    selectedId: this.props.selectedId,
                    onSelect:   this.props.onSelect
                  },
                  index ? null :
                    r.span('label',
                      this.props.tags.length === 1 ? 'Tag' : 'Tags'),
                  r.span('value',
                    tag.name)));
            }.bind(this))));
  }
};

module.exports = r.makeClassFactory('PubHeader', _);
