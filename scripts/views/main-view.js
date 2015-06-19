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
          className: 'browser-entry clickable',
          key:       'c-' + columnId + '-e-' + entryId,
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
    var isRoot     = columnId === 'root';
    var entryCount = entryIds && entryIds.length;
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
        r.div({
            style: {
              paddingLeft:  '8px',
              paddingRight: '8px'
            }
          },
          isRoot ? null :
            this.renderColumnHeader(columnId, columnIndex),
          (isRoot || !entryCount) ? null :
            r.div({
                className: 'browser-column-heading',
                style: {
                  color:        '#999',
                  fontSize:     '11px',
                  lineHeight:   '16px'
                }
              },
              r.br(),
              r.span('',
                'References'))),
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
      r.div({
          className: 'browser-column-header',
          style: {
            fontSize:   '11px',
            lineHeight: '16px'
          }
        },
        r.table({
            width: '100%'
          },
          r.tbody('',
            rows.map(function (row) {
                return (
                  r.tr({
                      key: 'r-' + row.key
                    },
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
          key:       'c-' + columnId,
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
