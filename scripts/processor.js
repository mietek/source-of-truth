'use strict';

var assign = require('object-assign');
var uuid = require('node-uuid');
var utils = require('./common/utils');
var rawDb = require('./database');

module.exports = {
  processDb: function () {
    var authorsByName = {};
    var authorsById   = {};

    function ensureAuthor(authorName) {
      var author;
      if (!(authorName in authorsByName)) {
        var shortName;
        if (authorName === 'et al.') {
          shortName = 'e.a.';
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
      return rawEntry.author ? [rawEntry.author] : (rawEntry.authors || []);
    }

    function getAuthorIds(rawEntry) {
      return getAuthorNames(rawEntry).map(function (authorName) {
          return ensureAuthor(authorName);
        });
    }

    function getEntryName(authorIds, rawEntry) {
      return (
        authorsById[authorIds[0]].shortName +
          (rawEntry.year ? ' ' + rawEntry.year : '') +
          (' — ' + rawEntry.title));
    }

    function ensureReference(rawEntry, citationId) {
      var authorIds = getAuthorIds(rawEntry);
      var entryName = getEntryName(authorIds, rawEntry);
      var entry;
      if (!(entryName in entriesByName)) {
        entry = {
          id:          uuid.v4(),
          title:       rawEntry.title,
          authorIds:   authorIds,
          year:        rawEntry.year,
          name:        entryName,
          citationIds: [citationId]
        };
      } else {
        var oldEntry = entriesByName[entryName];
        entry = assign({}, oldEntry, {
            citationIds: (oldEntry.citations || []).concat([citationId])
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
          id:           entryId,
          title:        rawEntry.title,
          authorIds:    authorIds,
          year:         rawEntry.year,
          name:         entryName,
          referenceIds: (rawEntry.references || []).map(function (reference) {
              return ensureReference(reference, entryId);
            })
        };
        entriesByName[entryName] = entry;
        entriesById[entry.id]    = entry;
      } else {
        var oldEntry = entriesByName[entryName];
        if (!oldEntry.referenceIds) {
          entry = assign({}, oldEntry, {
              referenceIds: (rawEntry.references || []).map(function (reference) {
                  return ensureReference(reference, oldEntry.id);
                })
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

    rawDb.forEach(function (publication) {
        ensurePublication(publication);
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
