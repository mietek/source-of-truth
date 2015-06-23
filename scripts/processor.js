'use strict';

var assign = require('object-assign');
var uuid = require('node-uuid');
var utils = require('./common/utils');
var rawEntries = require('./entries');

module.exports = {
  processDb: function () {
    var authorsByName = {};
    var authorsById   = {};

    function ensureAuthor(authorName) {
      var author;
      if (!(authorName in authorsByName)) {
        var shortName;
        if (authorName === 'et al.') {
          shortName = authorName;
        } else {
          var nameTokens = authorName.split(' ');
          shortName = nameTokens[nameTokens.length - 1];
        }
        author = {
          id:        uuid.v4(),
          name:      authorName,
          shortName: shortName
        };
        authorsByName[authorName] = author;
        authorsById[author.id]    = author;
      } else {
        author = authorsByName[authorName];
      }
      return author.id;
    }

    var entriesByName = {};
    var entriesById   = {};

    function getAuthorNames(rawEntry) {
      return rawEntry.author ? [rawEntry.author] : rawEntry.authors;
    }

    function getAuthorIds(rawEntry) {
      var authorNames = getAuthorNames(rawEntry);
      return authorNames && authorNames.map(function (authorName) {
          return ensureAuthor(authorName);
        });
    }

    function getEntrySignature(authorIds, rawEntry) {
      return (
        ((authorIds && authorIds.length) ? authorsById[authorIds[0]].shortName : 'unknown') +
          (rawEntry.year ? ' ' + rawEntry.year : ''));
    }

    function getEntryName(authorIds, rawEntry) {
      return (
        getEntrySignature(authorIds, rawEntry) +
          (' — ' + rawEntry.title));
    }

    function ensureReference(rawEntry, reverseId) {
      var authorIds = getAuthorIds(rawEntry);
      var entryName = getEntryName(authorIds, rawEntry);
      var entry;
      if (!(entryName in entriesByName)) {
        entry = {
          id:           uuid.v4(),
          authorIds:    authorIds,
          year:         rawEntry.year,
          signature:    getEntrySignature(authorIds, rawEntry),
          title:        rawEntry.title,
          name:         entryName,
          abstract:     undefined,
          basename:     undefined,
          collection:   undefined,
          isNumbered:   undefined,
          referenceIds: undefined,
          isMissing:    true,
          reverseIds:   [reverseId]
        };
      } else {
        var oldEntry = entriesByName[entryName];
        entry = assign({}, oldEntry, {
            reverseIds: (oldEntry.reverseIds || []).concat([reverseId])
          });
      }
      entriesByName[entryName] = entry;
      entriesById[entry.id]    = entry;
      return entry.id;
    }

    function ensurePublication(rawEntry) {
      var authorIds = getAuthorIds(rawEntry);
      var entryName = getEntryName(authorIds, rawEntry);
      var entry;
      if (!(entryName in entriesByName)) {
        var entryId = uuid.v4();
        entry = {
          id:             entryId,
          authorIds:      authorIds,
          year:           rawEntry.year,
          signature:      getEntrySignature(authorIds, rawEntry),
          title:          rawEntry.title,
          name:           entryName,
          abstract:       rawEntry.abstract,
          basename:       rawEntry.basename,
          collection:     rawEntry.collection,
          isNumbered:     !rawEntry.numbered || rawEntry.numbered === 'y',
          referenceIds:   (rawEntry.references || []).map(function (reference) {
              return ensureReference(reference, entryId);
            }),
          isMissing:      rawEntry.missing === 'y',
          reverseIds :    []
        };
        entriesByName[entryName] = entry;
        entriesById[entry.id]    = entry;
      } else {
        var oldEntry = entriesByName[entryName];
        if (oldEntry.isMissing) {
          entry = assign({}, oldEntry, {
              abstract:       rawEntry.abstract,
              basename:       rawEntry.basename,
              collection:     rawEntry.collection,
              isNumbered:     !rawEntry.numbered || rawEntry.numbered === 'y',
              referenceIds:   (rawEntry.references || []).map(function (reference) {
                  return ensureReference(reference, oldEntry.id);
                }),
              isMissing:      rawEntry.missing === 'y'
            });
          entriesByName[entryName] = entry;
          entriesById[entry.id]    = entry;
        } else {
          console.warning('Duplicate publication:', rawEntry);
          entry = oldEntry;
        }
      }
      return entry.id;
    }

    rawEntries.forEach(function (rawEntry) {
        ensurePublication(rawEntry);
      });
    Object.keys(entriesByName).forEach(function (entryName) {
        var oldEntry = entriesByName[entryName];
        var entry    = assign({}, oldEntry, {
            reverseIds: oldEntry.reverseIds.sort(function (c1, c2) {
                return entriesById[c1].name.localeCompare(entriesById[c2].name);
              })
          });
        entriesByName[entryName] = entry;
        entriesById[entry.id]    = entry;
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
};
