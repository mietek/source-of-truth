'use strict';

var assign = require('object-assign');
var r = require('../common/react');
var processor = require('../processor');

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

  renderEntry: function (columnId, columnIndex, entryId, entryIndex, entryCount) {
    var entry   = this.state.entriesById[entryId];
    var isOpen  = this.state.path.indexOf(entryId) === columnIndex + 1;
    var hasRefs = entry.referenceIds && entry.referenceIds.length;
    return (
      r.div({
          className: 'browser-entry' + (isOpen ? ' open' : ''),
          key:       'c-' + columnId + '-e-' + entryId,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, entryId);
          }.bind(this)
        },
        r.span('',
          entry.name),
        !hasRefs ? null :
          r.i('ui icon caret right')));
  },

  renderColumnWrapper: function (columnId, columnIndex, entryIds) {
    var isRoot     = columnId === 'root';
    var entryCount = entryIds && entryIds.length;
    return (
      r.div('browser-column-wrapper',
        isRoot ? null :
          this.renderColumnHeader(columnId, columnIndex),
        (isRoot || !entryCount) ? null :
          r.div('browser-column-heading',
            r.br(),
            r.span('',
              'References')),
        !entryIds ? null :
          entryIds.map(function (entryId, entryIndex) {
              return (
                this.renderEntry(columnId, columnIndex, entryId, entryIndex, entryCount));
            }.bind(this))));
  },

  renderColumnHeader: function (columnId, columnIndex) {
    var entry = this.state.entriesById[columnId];
    var rows = [
      {
        key: 'Title',
        value: entry.title
      },
      {
        key: 'Authors',
        value: entry.authorIds.reduce(function (result, authorId, authorIdIndex) {
            return result + (authorIdIndex ? ', ' : '') + this.state.authorsById[authorId].name;
          }.bind(this), '')
      },
      {
        key: 'Year',
        value: entry.year
      }
    ];
    return (
      r.div('browser-column-header',
        r.table('browser-table',
          r.tbody('',
            rows.map(function (row) {
                return (
                  r.tr({
                      key: 'r-' + row.key
                    },
                    r.td('browser-table-row-key',
                      row.key),
                    r.td('browser-table-row-value',
                      row.value)));
              }.bind(this))))));

  },

  renderColumn: function (columnId, columnIndex, columnCount) {
    var isRoot = columnId === 'root';
    var entryIds;
    if (isRoot) {
      entryIds = this.state.entryNames.map(function (entryName) {
          return (
            this.state.entriesByName[entryName].id);
        }.bind(this));
    } else {
      entryIds = this.state.entriesById[columnId].referenceIds;
    }
    return (
      r.div({
          className: 'browser-column',
          key:       'c-' + columnId,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, null);
          }.bind(this),
          style: {
            width: '' + 1/columnCount * 100 + '%',
          }
        },
        this.renderColumnWrapper(columnId, columnIndex, entryIds)));
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
