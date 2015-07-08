'use strict';

var Store = require('../common/store');
var dispatcher = require('../common/dispatcher');
var utils = require('../common/utils');

function encodePath(path) {
  return '#' + path.join('/');
}

function decodePath(hash) {
  return (
    !hash ? [] :
      hash.slice(1).split('/'));
}

function SelectionStore() {
  var path = decodePath(location.hash);
  this.path = path;
  this.dispatchToken = dispatcher.register(function (action) {
      switch (action.type) {
        case 'setPath':
          this.path = action.path;
          this.publish();
          break;
        case 'selectItemInColumn':
          this.selectItemInColumn(action.columnIx, action.itemId);
          this.publish();
          break;
      }
    }.bind(this));
  addEventListener('popstate', function (event) {
      var path = (
        !event.state ?
          decodePath(location.hash) :
          (event.state.path || []));
      this.path = path;
      this.publish();
    }.bind(this));
}

SelectionStore.prototype = utils.assign(new Store(), {
  selectItemInColumn: function (columnIx, itemId) {
    var base = this.path.slice(0, columnIx + 1);
    var path = itemId ? base.concat([itemId]) : base;
    var hash = encodePath(path);
    this.path = path;
    history.pushState({
        path: path
      }, '', hash);
  },

  getPath: function () { // TODO: Remove this
    return this.path;
  },

  getSelectedItemInColumn: function (columnIx) {
    return this.path[columnIx];
  }
});

module.exports = new SelectionStore();
