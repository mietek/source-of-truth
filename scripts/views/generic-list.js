'use strict';

var r = require('../common/react');

var genericItem = require('./generic-item');
var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      colIx:         r.propTypes.number.isRequired,
      label:         r.propTypes.string,
      items:         r.propTypes.array.isRequired,
      fullCount:     r.propTypes.number,
      isCollapsible: r.propTypes.bool,
      isCounted:     r.propTypes.bool,
      isFiltered:    r.propTypes.bool,
      isNumbered:    r.propTypes.bool,
      selectedId:    r.propTypes.string
    };
  },

  getDefaultProps: function () {
    return {
      isCollapsible: true,
      isCounted:     true,
      isFiltered:    true
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
    if (!this.state.isCollapsed && this.props.isCounted && isPartial) {
      filteringLabel = this.props.fullCount + ' available';
    }
    var collapsingLabel;
    if (!this.props.label) {
      if (!this.props.isCounted) {
        collapsingLabel = 'items';
      } else if (this.props.items.length === 1) {
        collapsingLabel = '1 item';
      } else {
        collapsingLabel = this.props.items.length + ' items';
      }
    } else {
      if (!this.props.isCounted) {
        collapsingLabel = this.props.label;
      } else {
        collapsingLabel = this.props.label + ' ' + this.props.items.length;
      }
    }
    return (
      r.div('list' + (
          (this.state.isCollapsed ? ' collapsed' : '') +
          (this.state.isFiltered ? ' filtered' : '') +
          (this.props.isNumbered ? ' numbered' : '')),
        r.div('section spacer',
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
              if (this.state.isFiltered) {
                var isPartial;
                if (item.type === 'pub') { // TODO: Refactor
                  isPartial = item.isPartial;
                } else {
                  isPartial = !item.fullCount;
                }
                if (isPartial) {
                  return null;
                }
              }
              var pubRef = (
                !this.props.isNumbered ? null :
                  '' + (itemIx + 1));
              switch (item.type) {
                case 'pub':
                  return (
                    pubItem({
                        colIx:      this.props.colIx,
                        key:        itemIx,
                        pubId:      item.id,
                        pubRef:     pubRef,
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
                        isSpecial:  item.isSpecial || item.isUntagged || item.isUnknown, // TODO: Refactor
                        isPartial:  item.fullCount === 0
                      },
                      r.span('content',
                        item.type === 'author' ? item.reverseFullName : item.name))); // TODO: Refactor
              }
            }.bind(this))));
  }
};

module.exports = r.makeClassFactory('GenericList', _);
