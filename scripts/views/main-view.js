'use strict';

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var column = require('./column');
var publicationColumn = require('./publication-column');
var rootColumn = require('./root-column');

var _ = {
  getInitialState: function () {
     var db = processor.processDb();
     return utils.assign({}, db, {
         path: []
       });
  },

  render: function () {
    var columnCount = this.state.path.length + 1;
    return (
      r.div('browser-pane',
        r.div({
            className: 'column-list',
            style: {
              width: '' + columnCount/3 * 100 + '%',
            }
          },
          column({
              columnCount: columnCount,
              onDeselect:  function () {
                this.setState({
                    path: []
                  });
              }.bind(this)
            },
            rootColumn({
                entriesById: this.state.entriesById,
                selectedId:  this.state.path.length > 0 && this.state.path[0],
                onSelect:    function (entryId) {
                  this.setState({
                      path: [entryId]
                    });
                }.bind(this)
              })),
          this.state.path.map(function (columnId, columnIndex) {
              var basePath   = this.state.path.slice(0, columnIndex + 1);
              var selectedId = this.state.path.length > (columnIndex + 1) && this.state.path[columnIndex + 1];
              return (
                column({
                    key:         columnIndex,
                    columnCount: columnCount,
                    onDeselect:  function () {
                      this.setState({
                          path: basePath
                        });
                    }.bind(this)
                  },
                  publicationColumn({
                      columnId:    columnId,
                      authorsById: this.state.authorsById,
                      entriesById: this.state.entriesById,
                      selectedId:  selectedId,
                      onSelect:    function (entryId) {
                        this.setState({
                            path: basePath.concat([entryId])
                          });
                      }.bind(this)})));
            }.bind(this)))));
  }
};

module.exports = r.makeClassFactory('MainView', _);
