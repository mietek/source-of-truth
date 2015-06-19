'use strict';

var r = require('../common/react');
var assign = require('object-assign');
var utils = require('../common/utils');
var uuid = require('node-uuid');
var rawDb = require('../database');

function processDb() {
  var authorsByName = {};
  var authorsById   = {};
  function ensureAuthor(authorName) {
    if (!(authorName in authorsByName)) {
      var shortName;
      if (authorName === 'et al.') {
        shortName = 'e.a.';
      } else {
        var nameTokens = authorName.split(' ');
        shortName = nameTokens[nameTokens.length - 1];
      }
      var author = {
        id:        uuid.v4(),
        name:      authorName,
        shortName: shortName
      };
      authorsByName[authorName] = author;
      authorsById[author.id]    = author;
    }
    return authorsByName[authorName].id;
  }
  var entriesByName = {};
  var entriesById   = {};
  function getAuthorNames(rawEntry) {
    return rawEntry.author ? [rawEntry.author] : (rawEntry.authors || []);
  }
  function getAuthorIds(rawEntry) {
    return getAuthorNames(rawEntry).map(function (authorName) {
        return ensureAuthor(authorName);
      });
  }
  function getEntryName(authorIds, rawEntry) {
    return authorsById[authorIds[0]].shortName + (rawEntry.year ? ' ' + rawEntry.year : '') + ' — ' + rawEntry.title;
  }
  function ensureEntry(rawEntry, isReference) {
    var authorIds    = getAuthorIds(rawEntry);
    var entryName    = getEntryName(authorIds, rawEntry);
    var referenceIds = (rawEntry.references || []).map(function (reference) {
        return ensureEntry(reference, true);
      });
    if (!(entryName in entriesByName) || !isReference) {
      var entry = {
        id:           uuid.v4(),
        year:         rawEntry.year,
        authorIds:    authorIds,
        title:        rawEntry.title,
        name:         entryName,
        referenceIds: referenceIds
      };
      entriesByName[entryName] = entry;
      entriesById[entry.id]    = entry;
    }
    return entriesByName[entryName].id;
  }
  rawDb.forEach(function (entry) {
      ensureEntry(entry, false);
    });
  return {
    authorsByName: authorsByName,
    authorsById:   authorsById,
    authorNames:   utils.getSortedKeys(authorsByName, function (n1, n2) {
        var ts1 = n1.split(' ');
        var ts2 = n2.split(' ');
        var t1 = ts1[ts1.length - 1];
        var t2 = ts2[ts2.length - 1];
        return t1.localeCompare(t2);
      }),
    entriesByName: entriesByName,
    entriesById:   entriesById,
    entryNames:    utils.getSortedKeys(entriesByName)
  };
}

var _ = {
  getInitialState: function () {
    var db = processDb();
    return assign({}, db, {
        path:          ['root']
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
    var hasRefs = !!entry.referenceIds.length;
    return (
      r.div({
          className: 'browser-entry clickable',
          key:       'b-c-' + columnId + '-e-' + entryId,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, entryId);
          }.bind(this),
          style: {
            backgroundColor: isOpen ? '#69f' : '#fff',
            color:           isOpen ? '#fff' : '',
            paddingLeft:     '8px',
            paddingRight:    '16px',
            width:           '100%',
            whiteSpace:      'nowrap',
            overflow:        'hidden',
            textOverflow:    'ellipsis',
            position:        'relative',
            borderRadius:    '500px'
          }
        },
        r.span('',
          entry.name),
        !hasRefs ? null :
          r.i({
              className: 'ui icon caret right',
              style: {
                position: 'absolute',
                top:      '3px',
                right:    '-3px'
              }
            })));
  },

  renderEntryWrapper: function (columnId, columnIndex, entryIds) {
    var isRoot = columnId === 'root';
    var entryCount = entryIds.length;
    return (
      r.div({
          className: 'browser-entry-wrapper',
          style: {
            fontFamily:    'Lucida Grande',
            fontSize:      '12px',
            lineHeight:    '18px',
            padding:       '1px'
          }
        },
        isRoot ? null :
          this.renderColumnHeader(columnId, columnIndex),
        (isRoot || !entryIds.length) ? null :
          r.div({
              className: 'browser-column-heading',
              style: {
                color:        '#999',
                fontSize:     '11px',
                lineHeight:   '16px',
                paddingLeft:  '8px'
              }
            },
            r.br(),
            r.span('',
              'References')),
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
      r.div({
          className: 'browser-column-header',
          style: {
            fontSize:     '11px',
            lineHeight:   '16px',
            paddingLeft:  '8px'
          }
        },
        r.table({
            width: '100%'
          },
          r.tbody('',
            rows.map(function (row) {
                return (
                  r.tr('',
                    r.td({
                        style: {
                          color:         '#999',
                          textAlign:     'right',
                          verticalAlign: 'top',
                          paddingRight:  '5px',
                          width:         '' + (100 / 3) + '%'
                        }
                      },
                      row.key),
                    r.td({
                        style: {
                          verticalAlign: 'top',
                          width:         '' + (100 / 3 * 2) + '%'
                        }
                      },
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
          key:       'b-c-' + columnId,
          onClick:   function (event) {
            event.stopPropagation();
            this.updatePath(columnId, null);
          }.bind(this),
          style: {
            border:           '0px #ccc solid',
            borderRightWidth: '1px',
            height:           '100%',
            width:            '' + (100 / columnCount) + '%',
            display:          'inline-block',
            overflowX:        'hidden',
            overflowY:        'scroll'
          }
        },
        this.renderEntryWrapper(columnId, columnIndex, entryIds)));
  },

  renderColumnWrapper: function (columnIds) {
    var columnCount = columnIds.length;
    return (
      r.div({
          className: 'browser-column-wrapper',
          style: {
            height: '100%',
            width:  '' + (100 / 3 * columnCount) + '%',
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
      r.div({
          className: 'browser-pane unselectable',
          style: {
            backgroundColor: '#fff',
            height:          '100%',
            width:           '100%',
            overflowX:       'scroll',
            overflowY:       'hidden'
          }
        },
        this.renderColumnWrapper(columnIds)));
  },

  render: function () {
    return (
      this.renderPane());
  }
};

module.exports = r.makeClassFactory('MainView', _);
