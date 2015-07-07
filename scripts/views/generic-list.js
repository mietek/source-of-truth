'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');
var genericTransitionGroup = require('./generic-transition-group');
var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      label:           r.propTypes.string,
      items:           r.propTypes.array,
      fullCount:       r.propTypes.number,
      isNumbered:      r.propTypes.bool,
      isLabelNumbered: r.propTypes.bool,
      selectedId:      r.propTypes.string,
      onSelect:        r.propTypes.func
    };
  },

  getDefaultProps: function () {
    return {
      isLabelNumbered: true
    };
  },

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  render: function () {
    if (!this.props.items) {
      return null;
    }
    var isClickable  = !!this.props.items.length;
    var label;
    if (!this.props.isLabelNumbered) {
      label = this.props.label;
    } else {
      var isPartial = this.props.items.length !== this.props.fullCount;
      label = (
        (!this.props.label ? '' :
          (this.props.label + ' ')) +
        this.props.fullCount +
        (!isPartial ? '' :
          '/' + this.props.items.length) +
        ' available');
    }
    return (
      r.div('list' + (
          (this.props.isNumbered ? ' numbered' : '') +
          (this.state.isHidden ? ' hidden' : '')),
        r.div('spacer',
          r.span({
              className: 'label' + (
                (isClickable ? ' clickable' : '')),
              onClick:   isClickable && function (event) {
                event.stopPropagation();
                this.setState({
                    isHidden: !this.state.isHidden
                  });
              }.bind(this)
            },
            label)),
        genericTransitionGroup({
            transitionName: 'height'
          },
          this.state.isHidden ? null :
            r.div({
                key: 'list'
              },
              this.props.items.map(function (item, index) {
                  switch (item.type) {
                    case 'pub':
                      return (
                        pubItem({
                            key:        index,
                            pubId:      item.id,
                            authors:    item.authors,
                            year:       item.year,
                            suffix:     item.suffix,
                            title:      item.title,
                            isPartial:  item.isPartial,
                            selectedId: this.props.selectedId,
                            onSelect:   this.props.onSelect
                          }));
                    default:
                      return (
                        genericItem({
                            key:        index,
                            itemId:     item.id,
                            isSpecial:  item.isSpecial || item.isUntagged || item.isUnknown, // TODO: Ugh
                            isPartial:  item.fullCount === 0,
                            selectedId: this.props.selectedId,
                            onSelect:   this.props.onSelect
                          },
                          r.span('content',
                            item.type === 'author' ? item.reverseFullName : item.name))); // TODO: Ugh
                  }
                }.bind(this))))));
  }
};

module.exports = r.makeClassFactory('GenericList', _);
