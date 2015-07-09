'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');
var genericTransitionGroup = require('./generic-transition-group');
var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      label:           r.propTypes.string,
      items:           r.propTypes.array.isRequired,
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
      isCollapsed: false,
      isFiltered:  false
    };
  },

  render: function () {
    if (!this.props.items) {
      return null;
    }
    var isClickable = !!this.props.items.length;
    var isPartial   = this.props.items.length && this.props.items.length !== this.props.fullCount;
    var availableLabel;
    if (this.props.isLabelNumbered && isPartial) {
      availableLabel = this.props.fullCount + '/' + this.props.items.length + ' available';
    }
    var label;
    if (!this.props.label) {
      if (!this.props.isLabelNumbered) {
        label = 'items';
      } else if (this.props.items.length === 1) {
        label = '1 item';
      } else {
        label = this.props.items.length + ' items';
      }
    } else {
      if (!this.props.isLabelNumbered) {
        label = this.props.label;
      } else {
        label = this.props.label + ' ' + this.props.items.length;
      }
    }
    return (
      r.div('list' + (
          (this.props.isNumbered ? ' numbered' : '') +
          (this.state.isCollapsed ? ' collapsed' : '') +
          (this.state.isFiltered ? ' filtered' : '')),
        r.div('spacer',
          r.span({
              className: 'label' + (
                (isClickable ? ' clickable' : '')),
              onClick:   isClickable && function (event) {
                event.stopPropagation();
                this.setState({
                    isCollapsed: !this.state.isCollapsed
                  });
              }.bind(this)
            },
            label),
          !availableLabel ? null :
            r.span({
                className: 'available label clickable',
                onClick:   function (event) {
                  event.stopPropagation();
                  this.setState({
                      isFiltered: !this.state.isFiltered
                    });
                }.bind(this)
              },
              availableLabel)),
        genericTransitionGroup({
            transitionName: 'height'
          },
          this.state.isCollapsed ? null :
            r.div({
                key: 'list'
              },
              this.props.items.map(function (item, itemIx) {
                  switch (item.type) {
                    case 'pub':
                      return (
                        pubItem({
                            key:        itemIx,
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
                            key:        itemIx,
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
