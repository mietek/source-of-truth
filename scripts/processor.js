'use strict';

var uuid = require('node-uuid');
var utils = require('./common/utils');
var rawDb = require('./database');

module.exports = {
  processDb: function () {
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
      return (
        authorsById[authorIds[0]].shortName +
          (rawEntry.year ? ' ' + rawEntry.year : '') +
          (' — ' + rawEntry.title));
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
};
