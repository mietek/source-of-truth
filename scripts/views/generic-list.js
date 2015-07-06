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
      isNumbered:      r.propTypes.bool,
      isLabelNumbered: r.propTypes.bool,
      isLabelSwapped:  r.propTypes.bool,
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
    var isClickable = !!this.props.items.length;
    var label       = (
      !this.props.isLabelNumbered ? this.props.label : (
        this.props.isLabelSwapped ?
          (this.props.label + ' ' + this.props.items.length) :
          (this.props.items.length + ' ' + this.props.label))) + (
      (this.state.isHidden ? '…' : ''));
    return (
      r.div('list' + (
          (this.props.isNumbered ? ' numbered' : '')),
        r.div('spacer',
          !this.props.label ? null :
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
                            signature:  item.name, // TODO: Ugh, naming
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
                            isPartial:  item.isPartial,
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
