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

  renderColumnHeading: function (title) {
    return (
      r.div('browser-column-heading',
        r.br(),
        r.span('',
          title)));
  },

  renderColumnWrapper: function (columnId, columnIndex, entryIds) {
    var entryCount = entryIds && entryIds.length;
    return (
      r.div('browser-column-wrapper',
        this.renderColumnHeader(columnId, columnIndex),
        !entryCount ? null :
          this.renderColumnHeading('References'),
        (entryIds || []).map(function (entryId, entryIndex) {
            return (
              this.renderEntry(columnId, columnIndex, entryId, entryIndex, entryCount));
          }.bind(this))));
  },

  renderRootColumnWrapper: function (entryIds) {
    var entryCount = entryIds && entryIds.length;
    return (
      r.div('browser-column-wrapper',
        (entryIds || []).map(function (entryId, entryIndex) {
            return (
              this.renderEntry('root', 0, entryId, entryIndex, entryCount));
          }.bind(this))));
  },

  renderColumn: function (columnId, columnIndex, columnCount) {
    var entryIds = this.state.entriesById[columnId].referenceIds;
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
