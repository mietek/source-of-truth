'use strict';

var Store = require('../common/store');
var dispatcher = require('../common/dispatcher');
var utils = require('../common/utils');

function SelectionStore() {
  var path = utils.decodePath(location.hash);
  this.path = path;
  this.dispatchToken = dispatcher.register(function (action) {
      switch (action.type) {
        case 'setPath':
          this.path = action.path;
          this.publish();
          break;
        case 'selectItemInColumn':
          this.selectItemInColumn(action.itemId, action.colIx);
          this.publish();
          break;
      }
    }.bind(this));
  addEventListener('popstate', function (event) {
      var path = (
        !event.state ?
          utils.decodePath(location.hash) :
          (event.state.path || []));
      this.path = path;
      this.publish();
    }.bind(this));
}

SelectionStore.prototype = utils.assign(new Store(), {
  selectItemInColumn: function (itemId, colIx) {
    var base = this.path.slice(0, colIx);
    var path = itemId ? base.concat([itemId]) : base;
    var hash = utils.encodePath(path);
    this.path = path;
    history.pushState({
        path: path
      }, '', hash);
  },

  getPath: function () {
    return this.path;
  }
});

module.exports = new SelectionStore();
