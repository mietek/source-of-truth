'use strict';

var r = require('../common/react');

var citation = require('./citation');

var _ = {
  propTypes: function () {
    return {
      heading: r.propTypes.string,
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
        r.div('citation-list',
          !this.props.heading ? null :
            r.div({
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
                  citation(item));
              })));
  }
};

module.exports = r.makeClassFactory('CitationList', _);
