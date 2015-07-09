'use strict';

var dispatcher = require('../common/dispatcher');

module.exports = {
  setPath: function (path) {
    dispatcher.dispatch({
        type: 'setPath',
        path: path
      });
  },

  selectItemInColumn: function (itemId, colIx) {
    dispatcher.dispatch({
        type:   'selectItemInColumn',
        itemId: itemId,
        colIx:  colIx
      });
  }
};
