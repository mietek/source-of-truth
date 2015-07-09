'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');
var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      colIx:           r.propTypes.number.isRequired,
      label:           r.propTypes.string,
      items:           r.propTypes.array.isRequired,
      fullCount:       r.propTypes.number,
      isNumbered:      r.propTypes.bool,
      isLabelNumbered: r.propTypes.bool,
      isCollapsible:   r.propTypes.bool,
      isFiltered:      r.propTypes.bool,
      selectedId:      r.propTypes.string
    };
  },

  getDefaultProps: function () {
    return {
      isLabelNumbered: true,
      isCollapsible:   true,
      isFiltered:      true
    };
  },

  getInitialState: function () {
    return {
      isCollapsed: false,
      isFiltered:  this.props.isFiltered
    };
  },

  render: function () {
    if (!this.props.items) {
      return null;
    }
    var isClickable = this.props.isCollapsible && !!this.props.items.length;
    var isPartial   = this.props.items.length && this.props.items.length !== this.props.fullCount;
    var filteringLabel;
    if (!this.state.isCollapsed && this.props.isLabelNumbered && isPartial) {
      filteringLabel = this.props.fullCount + ' available';
    }
    var collapsingLabel;
    if (!this.props.label) {
      if (!this.props.isLabelNumbered) {
        collapsingLabel = 'items';
      } else if (this.props.items.length === 1) {
        collapsingLabel = '1 item';
      } else {
        collapsingLabel = this.props.items.length + ' items';
      }
    } else {
      if (!this.props.isLabelNumbered) {
        collapsingLabel = this.props.label;
      } else {
        collapsingLabel = this.props.label + ' ' + this.props.items.length;
      }
    }
    return (
      r.div('list' + (
          (this.props.isNumbered ? ' numbered' : '') +
          (this.state.isCollapsed ? ' collapsed' : '') +
          (this.state.isFiltered ? ' filtered' : '')),
        r.div('spacer',
          r.span({
              className: 'collapsing label' + (
                (isClickable ? ' clickable' : '')),
              onClick:   isClickable && function (event) {
                event.stopPropagation();
                this.setState({
                    isCollapsed: !this.state.isCollapsed
                  });
              }.bind(this)
            },
            collapsingLabel),
          !filteringLabel ? null :
            r.span({
                className: 'neutral label',
                onClick:   function (event) {
                  event.stopPropagation();
                }.bind(this)
              },
              ' — '),
          !filteringLabel ? null :
            r.span({
                className: 'filtering label clickable',
                onClick:   function (event) {
                  event.stopPropagation();
                  this.setState({
                      isFiltered: !this.state.isFiltered
                    });
                }.bind(this)
              },
              filteringLabel)),
        this.state.isCollapsed ? null :
          this.props.items.map(function (item, itemIx) {
              switch (item.type) {
                case 'pub':
                  return (
                    pubItem({
                        colIx:      this.props.colIx,
                        key:        itemIx,
                        pubId:      item.id,
                        authors:    item.authors,
                        year:       item.year,
                        suffix:     item.suffix,
                        title:      item.title,
                        isSelected: item.id === this.props.selectedId,
                        isPartial:  item.isPartial
                      }));
                default:
                  return (
                    genericItem({
                        colIx:      this.props.colIx,
                        key:        itemIx,
                        itemId:     item.id,
                        isSelected: item.id === this.props.selectedId,
                        isSpecial:  item.isSpecial || item.isUntagged || item.isUnknown, // TODO: Ugh
                        isPartial:  item.fullCount === 0
                      },
                      r.span('content',
                        item.type === 'author' ? item.reverseFullName : item.name))); // TODO: Ugh
              }
            }.bind(this))));
  }
};

module.exports = r.makeClassFactory('GenericList', _);
