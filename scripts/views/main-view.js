'use strict';

var assign = require('object-assign');
var r = require('../common/react');
var processor = require('../processor');

var collection = require('./collection');
var publication = require('./publication');

var _ = {
  getInitialState: function () {
    var db = processor.processDb();
    return assign({}, db, {
        path: ['root']
      });
  },

  updatePath: function (columnId, entryId) {
    var path;
    var columnIndex = this.state.path.indexOf(columnId);
    if (columnIndex !== -1) {
      path = this.state.path.slice(0, columnIndex + 1);
    } else {
      path = this.state.path;
    }
    var title;
    if (entryId) {
      path  = path.concat([entryId]);
      title = this.state.entriesById[entryId].name;
    } else if (columnId !== 'root') {
      title = this.state.entriesById[columnId].name;
    } else {
      title = 'Source of Truth';
    }
    document.title = title;
    this.setState({
        path: path
      });
  },

  renderColumnWrapper: function (columnId, columnIndex, columnEntry) {
    var citations = columnEntry.referenceIds && columnEntry.referenceIds.map(function (entryId, entryIndex) {
        var entry          = this.state.entriesById[entryId];
        var pathIndex      = this.state.path.indexOf(entryId);
        var isSelected     = pathIndex !== -1 && pathIndex === columnIndex + 1;
        var isSemiSelected = pathIndex !== -1 && pathIndex <= columnIndex;
        return {
          key:            entryIndex,
          signature:      entry.signature,
          title:          entry.title,
          isNumbered:     columnEntry.isNumbered,
          isSelected:     isSelected,
          isSemiSelected: isSemiSelected,
          isMissing:      entry.isMissing,
          onClick:        function () {
            this.updatePath(columnId, entryId);
          }.bind(this)
        };
      }.bind(this));
    var reverseCitations = columnEntry.reverseIds && columnEntry.reverseIds.map(function (entryId, entryIndex) {
        var entry          = this.state.entriesById[entryId];
        var pathIndex      = this.state.path.indexOf(entryId);
        var isSelected     = pathIndex !== -1 && pathIndex === columnIndex + 1;
        var isSemiSelected = pathIndex !== -1 && pathIndex <= columnIndex;
        return {
          key:            entryIndex,
          signature:      entry.signature,
          title:          entry.title,
          isSelected:     isSelected,
          isSemiSelected: isSemiSelected,
          isMissing:      entry.isMissing,
          onClick:        function () {
            this.updatePath(columnId, entryId);
          }.bind(this)
        };
      }.bind(this));
    return (
      publication({
          title:            columnEntry.title,
          authors:          columnEntry.authorIds.map(function (authorId) {
              return {
                name: this.state.authorsById[authorId].name
              };
            }.bind(this)),
          year:             columnEntry.year,
          collections:      columnEntry.collection && [{
              name: columnEntry.collection
            }],
          abstract:         columnEntry.abstract,
          citations:        citations,
          reverseCitations: reverseCitations
        }));
  },

  renderRootColumnWrapper: function (entryIds) {
    var citations = (entryIds || []).map(function (entryId, entryIndex) {
        var entry      = this.state.entriesById[entryId];
        var pathIndex  = this.state.path.indexOf(entryId);
        var isSelected = pathIndex !== -1 && pathIndex === 1;
        return {
          key:            entryIndex,
          signature:      entry.signature,
          title:          entry.title,
          isSelected:     isSelected,
          isMissing:      entry.isMissing,
          onClick:        function () {
            this.updatePath('root', entryId);
          }.bind(this)
        };
      }.bind(this));
    return (
      collection({
          name:      'Source of Truth',
          citations: citations
        }));
  },

  renderColumn: function (columnId, columnIndex, columnCount) {
    var entry = this.state.entriesById[columnId];
    return (
      r.div({
          className: 'browser-column',
          key:       'c-' + columnId + '-' + columnIndex,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, null);
          }.bind(this),
          style: {
            width: '' + 1/columnCount * 100 + '%',
          }
        },
        this.renderColumnWrapper(columnId, columnIndex, entry)));
  },

  renderRootColumn: function (columnCount) {
    var entryIds = this.state.entryNames.map(function (entryName) {
        return (
          this.state.entriesByName[entryName].id);
      }.bind(this));
    return (
      r.div({
          className: 'browser-column',
          key:       'c-root',
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath('root', null);
          }.bind(this),
          style: {
            width: '' + 1/columnCount * 100 + '%',
          }
        },
        this.renderRootColumnWrapper(entryIds)));
  },

  renderPaneWrapper: function (columnIds) {
    var columnCount = columnIds.length;
    return (
      r.div({
          className: 'browser-pane-wrapper',
          style: {
            width: '' + columnCount/3 * 100 + '%',
          }
        },
        columnIds.map(function (columnId, columnIndex) {
            return (
              columnId === 'root' ?
                this.renderRootColumn(columnCount) :
                this.renderColumn(columnId, columnIndex, columnCount));
          }.bind(this))));
  },

  renderPane: function () {
    var columnIds = this.state.path;
    return (
      r.div('browser-pane',
        this.renderPaneWrapper(columnIds)));
  },

  render: function () {
    return (
      this.renderPane());
  }
};

module.exports = r.makeClassFactory('MainView', _);
