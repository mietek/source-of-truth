'use strict';

var r = require('../common/react');
var utils = require('../common/utils');
var processor = require('../processor');

var column = require('./column');
var pubColumn = require('./pub-column');
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
              columnCount: columnCount
            },
            rootColumn({
                pubs:       this.state.pubs,
                selectedId: this.state.path.length > 0 && this.state.path[0],
                onSelect:   function (pubId) {
                  this.setState({
                      path: pubId ? [pubId] : []
                    });
                }.bind(this)
              })),
          this.state.path.map(function (id, index) {
              var pub        = this.state.pubsById[id];
              var basePath   = this.state.path.slice(0, index + 1);
              var selectedId = this.state.path.length > (index + 1) && this.state.path[index + 1];
              return (
                column({
                    key:         id + '-' + index,
                    columnCount: columnCount
                  },
                  pubColumn({
                      title:            pub.title,
                      authors:          pub.authors,
                      year:             pub.year,
                      collections:      pub.collections,
                      abstract:         pub.abstract,
                      citations:        pub.citations,
                      reverseCitations: pub.reverseCitations,
                      isNumbered:       pub.isNumbered,
                      selectedId:       selectedId,
                      onSelect:         function (pubId) {
                        this.setState({
                            path: pubId ? basePath.concat([pubId]) : basePath
                          });
                      }.bind(this)})));
            }.bind(this)))));
  }
};

module.exports = r.makeClassFactory('MainView', _);
