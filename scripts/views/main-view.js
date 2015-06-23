'use strict';

var assign = require('object-assign');
var r = require('../common/react');
var processor = require('../processor');

var abstract = require('./abstract');
var citationList = require('./citation-list');
var description = require('./description');

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

  renderCitations: function (columnId, columnIndex, columnEntry) {
    var items = columnEntry.referenceIds && columnEntry.referenceIds.map(function (entryId, entryIndex) {
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
    return (
      citationList({
          heading: 'Cites',
          items:   items
        }));
  },

  renderReverseCitations: function (columnId, columnIndex, columnEntry) {
    var items = columnEntry.reverseIds && columnEntry.reverseIds.map(function (entryId, entryIndex) {
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
      citationList({
          heading: 'Cited by',
          items:   items
        }));
  },

  renderRootCitations: function (entryIds) {
    var items = (entryIds || []).map(function (entryId, entryIndex) {
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
      citationList({
          heading: '',
          items:   items
        }));
  },

  renderColumnWrapper: function (columnId, columnIndex, entry) {
    return (
      r.div('browser-column-wrapper',
        !entry.basename ? null :
          r.div('browser-full-text',
            r.img({
                src: 'http://sourceoftruth.net/_previews/' + entry.basename + '.png'
              })),
        this.renderColumnHeader(columnId, columnIndex),
        abstract({
            content: entry.abstract
          }),
        this.renderCitations(columnId, columnIndex, entry),
        this.renderReverseCitations(columnId, columnIndex, entry)));
  },

  renderRootColumnWrapper: function (entryIds) {
    return (
      r.div('browser-column-wrapper',
        this.renderRootCitations(entryIds)));
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
