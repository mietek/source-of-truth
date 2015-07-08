'use strict';

var dispatcher = require('../common/dispatcher');

module.exports = {
  setPath: function (path) {
    dispatcher.dispatch({
        type: 'setPath',
        path: path
      });
  },

  selectItemInColumn: function (columnIndex, itemId) {
    dispatcher.dispatch({
        type:        'selectItemInColumn',
        columnIndex: columnIndex,
        itemId:      itemId
      });
  }
};
