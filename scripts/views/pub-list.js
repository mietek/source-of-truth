'use strict';

var r = require('../common/react');

var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      heading:    r.propTypes.string.isRequired,
      pubs:       r.propTypes.array,
      isSwapped:  r.propTypes.bool,
      isNumbered: r.propTypes.bool,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func.isRequired
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
        r.div('pub-list' + (
            (this.props.isNumbered ? ' numbered' : '')),
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
            this.props.pubs.map(function (pub, index) {
                return (
                  pubItem({
                      key:        index,
                      id:         pub.id,
                      signature:  pub.signature,
                      title:      pub.title,
                      isNumbered: pub.isNumbered,
                      isMissing:  pub.isMissing,
                      selectedId: this.props.selectedId,
                      onSelect:   this.props.onSelect
                    }));
              }.bind(this))));
  }
};

module.exports = r.makeClassFactory('PubList', _);
