'use strict';

var r = require('../common/react');

var pubList = require('./pub-list');

var _ = {
  propTypes: function () {
    return {
      pubs:       r.propTypes.array,
      selectedId: r.propTypes.string,
      onSelect:   r.propTypes.func
    };
  },

  render: function () {
    return (
      r.div('root wrapper',
        pubList({
            pubs:       this.props.pubs,
            selectedId: this.props.selectedId,
            onSelect:   this.props.onSelect
          })));
  }
};

module.exports = r.makeClassFactory('RootColumn', _);
