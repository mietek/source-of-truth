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
    var entry     = this.state.entriesById[entryId];
    var pathIndex = this.state.path.indexOf(entryId);
    var isActive  = pathIndex !== -1 && pathIndex === columnIndex + 1;
    var isOpen    = pathIndex !== -1 && pathIndex <= columnIndex;
    return (
      r.div({
          className: 'browser-entry' + (
            (isActive ? ' active' : (isOpen ? ' open' : '')) +
            (entry.isMissing ? ' missing' : '')),
          key:       'e-' + entryId + '-' + entryIndex,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, entryId);
          }.bind(this)
        },
        r.div('browser-entry-data',
          r.span('browser-data-key',
            entry.signature),
          r.span('browser-data-value',
            entry.title))));
  },

  renderColumnHeader: function (columnId, columnIndex) {
    var entry = this.state.entriesById[columnId];
    var rows = [
      {
        key:    'Title',
        values: [entry.title]
      },
      {
        key:    entry.authorIds.length === 1 ? 'Author' : 'Authors',
        values: entry.authorIds.map(function (authorId) {
            return this.state.authorsById[authorId].name;
          }.bind(this))
      },
      {
        key:    'Year',
        values: [entry.year]
      },
      {
        key:    'Collection',
        values: entry.collection && [entry.collection]
      },
      {
        key:    'Abstract',
        values: entry.abstract && [entry.abstract]
      }
    ];
    return (
      r.div('browser-column-header',
        r.div('browser-column-metadata',
          rows.map(function (row) {
              return (
                !row.values ? null : [
                    r.span('browser-metadata-key',
                      row.key),
                    row.values.map(function (value) {
                        return (
                          r.span('browser-metadata-value',
                            value));
                      })
                  ]);
            }.bind(this)))));

  },

  renderColumnHeading: function (title) {
    return (
      r.div('browser-column-heading',
        r.span('',
          title)));
  },

  renderColumnWrapper: function (columnId, columnIndex, entry) {
    var referenceCount = entry.referenceIds && entry.referenceIds.length;
    var reverseCount   = entry.reverseIds && entry.reverseIds.length;
    return (
      r.div('browser-column-wrapper',
        !entry.basename ?
          this.renderColumnHeading('Full text not available') :
          r.div('browser-full-text',
            r.img({
                src: 'http://sourceoftruth.net/_previews/' + entry.basename + '.png'
              })),
        this.renderColumnHeader(columnId, columnIndex),
        (!entry.referenceIds || (!referenceCount && entry.isMissing)) ?
          this.renderColumnHeading('References not available') :
          r.div(entry.isNumbered ? 'numbered references' : 'references',
            this.renderColumnHeading(referenceCount === 1 ? '1 reference' : referenceCount + ' references'),
            (entry.referenceIds || []).map(function (entryId, entryIndex) {
                return (
                  this.renderEntry(columnId, columnIndex, entryId, entryIndex, referenceCount));
              }.bind(this))),
        (!entry.reverseIds || (!reverseCount && entry.isMissing)) ?
          this.renderColumnHeading('Reverse references not available') :
          r.div('reverse-references',
            this.renderColumnHeading(reverseCount === 1 ? '1 reverse reference' : reverseCount + ' reverse references'),
            (entry.reverseIds || []).map(function (entryId, entryIndex) {
                return (
                  this.renderEntry(columnId, columnIndex, entryId, entryIndex, reverseCount));
              }.bind(this)))));
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
