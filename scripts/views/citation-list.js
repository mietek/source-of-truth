'use strict';

var r = require('../common/react');

var citationListItem = require('./citation-list-item');

var _ = {
  propTypes: function () {
    return {
      heading: r.propTypes.string.isRequired,
      items:   r.propTypes.array
    };
  },

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  render: function () {
    return (
      !this.props.items ? null :
        r.div({
            key:       this.props.key,
            className: 'citation-list'
          },
          r.span({
              className: 'heading' + (
                (!this.props.items.length ? ' empty' : '')),
              onClick:   function (event) {
                event.stopPropagation();
                if (this.props.items.length) {
                  this.setState({
                      isHidden: !this.state.isHidden
                    });
                }
              }.bind(this)
            },
            this.props.heading + ' ' + this.props.items.length + (
              (this.state.isHidden ? ' …' : ''))),
          this.state.isHidden ? null :
            this.props.items.map(function (item) {
                return (
                  citationListItem(item));
              })));
  }
};

module.exports = r.makeClassFactory('CitationList', _);
