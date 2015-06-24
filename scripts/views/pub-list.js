'use strict';

var r = require('../common/react');

var pubItem = require('./pub-item');

var _ = {
  propTypes: function () {
    return {
      label:      r.propTypes.string,
      pubs:       r.propTypes.array,
      isSwapped:  r.propTypes.bool,
      isNumbered: r.propTypes.bool,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  getDefaultProps: function () {
    return {
      label: 'Publications'
    };
  },

  getInitialState: function () {
    return {
      isHidden: false
    };
  },

  render: function () {
    if (!this.props.pubs) {
      return null;
    }
    var isClickable = !!this.props.pubs.length;
    var label       = (
      this.props.isSwapped ?
        (this.props.label + ' ' + this.props.pubs.length) :
        (this.props.pubs.length + ' ' + this.props.label)) + (
          (this.state.isHidden ? ' …' : ''));
    return (
      r.div('pub-list' + (
          (this.props.isNumbered ? ' numbered' : '')),
        !this.props.label ? null :
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
        this.state.isHidden ? null :
          this.props.pubs.map(function (pub, index) {
              return (
                pubItem({
                    key:        index,
                    pubId:      pub.id,
                    signature:  pub.signature,
                    title:      pub.title,
                    isPartial:  pub.isPartial,
                    selectedId: this.props.selectedId,
                    onSelect:   this.props.onSelect
                  }));
            }.bind(this))));
  }
};

module.exports = r.makeClassFactory('PubList', _);
