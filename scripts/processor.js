'use strict';

var utils = require('./common/utils');

var rawPubs = require('./entries');

var authors           = [];
var authorsByName     = {};
var authorsById       = {};

var collections       = [];
var collectionsByName = {};
var collectionsById   = {};

var pubs              = [];
var pubsByName        = {};
var pubsById          = {};

var years             = [];
var yearsByName       = {};
var yearsById         = {};

function getAuthorBasename(authorName) {
  if (authorName === 'et al.') {
    return 'et al.';
  }
  var tokens = authorName.split(' ');
  return (
    tokens[tokens.length - 1]);
}

function ensureAuthor(authorName) {
  if (!(authorName in authorsByName)) {
    var author = {
      id:       utils.getRandomUuid(),
      name:     authorName,
      basename: getAuthorBasename(authorName),
      pubs:     []
    };
    authors.push(author);
    authorsByName[authorName] = author;
    authorsById[author.id]    = author;
    return author;
  }
  return authorsByName[authorName];
}

function ensureCollection(collectionName) {
  if (collectionName in collectionsByName) {
    return collectionsByName[collectionName];
  }
  var collection = {
    id:   utils.getRandomUuid(),
    name: collectionName,
    pubs: []
  };
  collections.push(collection);
  collectionsByName[collectionName] = collection;
  collectionsById[collection.id]    = collection;
  return collection;
}

function ensureYear(yearName) {
  if (yearName in yearsByName) {
    return yearsByName[yearName];
  }
  var year = {
    id:   utils.getRandomUuid(),
    name: yearName,
    pubs: []
  };
  years.push(year);
  yearsByName[yearName] = year;
  yearsById[year.id]    = year;
  return year;
}

function getPubAuthors(rawPub) {
  var authorNames = (
    rawPub.author ?
      [rawPub.author] :
      rawPub.authors);
  return (
    authorNames && authorNames.map(function (authorName) {
        return ensureAuthor(authorName);
      }));
}

function getPubCollections(rawPub) {
  var collectionNames = (
    rawPub.collection ?
      [rawPub.collection] :
      rawPub.collections);
  return (
    collectionNames && collectionNames.map(function (collectionName) {
        return ensureCollection(collectionName);
      }));
}

function getPubYear(rawPub) {
  return (
    rawPub.year && ensureYear(rawPub.year));
}

function getPubSignature(authors, rawPub) {
  var firstBasename = (
    (authors && authors.length) ?
      authors[0].basename :
      'unknown');
  return (
    firstBasename + (
      (rawPub.year ? ' ' + rawPub.year : '')));
}

function getPubName(authors, rawPub) {
  return (
    getPubSignature(authors, rawPub) +
      (' — ' + rawPub.title));
}

function ensureCitation(rawPub, reverseCitation) {
  var pubAuthors = getPubAuthors(rawPub);
  var pubName    = getPubName(pubAuthors, rawPub);
  var pub;
  if (!(pubName in pubsByName)) {
    pub = {
      id:        utils.getRandomUuid(),
      title:     rawPub.title,
      authors:   pubAuthors,
      year:      getPubYear(rawPub),
      signature: getPubSignature(pubAuthors, rawPub),
      name:      pubName,
      isMissing: true
    };
    pubs.push(pub);
    pubsByName[pubName] = pub;
    pubsById[pub.id]    = pub;
  } else {
    pub = pubsByName[pubName];
  }
  utils.assign(pub, {
      reverseCitations: (pub.reverseCitations || []).concat([reverseCitation])
    });
  return pub;
}

function ensurePub(rawPub) {
  var pubAuthors = getPubAuthors(rawPub);
  var pubName    = getPubName(pubAuthors, rawPub);
  var pub;
  if (!(pubName in pubsByName)) {
    pub = {
      id:               utils.getRandomUuid(),
      title:            rawPub.title,
      authors:          pubAuthors,
      year:             getPubYear(rawPub),
      signature:        getPubSignature(pubAuthors, rawPub),
      name:             pubName,
      citations:        [],
      reverseCitations: []
    };
    pubs.push(pub);
    pubsByName[pubName] = pub;
    pubsById[pub.id]    = pub;
  } else {
    pub = pubsByName[pubName];
    if (!pub.isMissing) {
      console.warning('Duplicate pub:', rawPub, pub);
    }
  }
  utils.assign(pub, {
      citations:   (rawPub.references || []).map(function (citation) { // TODO
          return ensureCitation(citation, pub);
        }),
      basename:    rawPub.basename,
      collections: getPubCollections(rawPub),
      abstract:    rawPub.abstract,
      isNumbered:  !rawPub.numbered || rawPub.numbered === 'y',
      isMissing:   rawPub.missing === 'y'
    });
  return pub;
}

module.exports = {
  processDb: function () {
    rawPubs.forEach(function (rawPub) {
        ensurePub(rawPub);
      });
    pubs.forEach(function (pub) {
        pub.reverseCitations.sort(function (citation1, citation2) {
            return citation1.name.localeCompare(citation2.name);
          });
      });
    pubs.sort(function (pub1, pub2) {
        return pub1.name.localeCompare(pub2.name);
      });
    return {
      authors:         authors,
      authorsById:     authorsById,
      collections:     collections,
      collectionsById: collectionsById,
      pubs:            pubs,
      pubsById:        pubsById,
      years:           years,
      yearsById:       yearsById
    };
  }
};
