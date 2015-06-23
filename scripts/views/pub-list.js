'use strict';

var r = require('../common/react');

var pubListItem = require('./pub-list-item');

var _ = {
  propTypes: function () {
    return {
      heading:   r.propTypes.string.isRequired,
      pubs:      r.propTypes.array,
      isSwapped: r.propTypes.bool
    };
  },

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  render: function () {
    return (
      !this.props.pubs ? null :
        r.div('pub-list',
          !this.props.heading ? null :
            r.div({
                className: 'heading' + (
                  (!this.props.pubs.length ? ' empty' : '')),
                onClick:   function (event) {
                  event.stopPropagation();
                  if (this.props.pubs.length) {
                    this.setState({
                        isHidden: !this.state.isHidden
                      });
                  }
                }.bind(this)
              },
              (this.props.isSwapped ?
                (this.props.heading + ' ' + this.props.pubs.length) :
                (this.props.pubs.length + ' ' + this.props.heading)) + (
                (this.state.isHidden ? ' …' : ''))),
          this.state.isHidden ? null :
            this.props.pubs.map(function (pub) {
                return (
                  pubListItem(pub));
              })));
  }
};

module.exports = r.makeClassFactory('PubList', _);
