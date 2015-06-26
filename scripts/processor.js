'use strict';

var utils = require('./common/utils');

var rawPubs = require('./entries');

var pubs              = [];
var pubsByName        = {};
var authors           = [];
var authorsByName     = {};
var collections       = [];
var collectionsByName = {};
var years             = [];
var yearsByName       = {};
var itemsById         = {};

function getAuthorBasename(name) {
  if (name === 'et al.') {
    return 'et al.';
  }
  var tokens = name.split(' ');
  return (
    tokens[tokens.length - 1]);
}

function ensureAuthor(name) {
  if (name in authorsByName) {
    return authorsByName[name];
  }
  var author = {
    type:     'author',
    id:       utils.getRandomUuid(),
    name:     name,
    basename: getAuthorBasename(name),
    pubs:        [],
    fullPubs:    [],
    partialPubs: []
  };
  authors.push(author);
  authorsByName[name]  = author;
  itemsById[author.id] = author;
  return author;
}

function ensureCollection(name) {
  if (name in collectionsByName) {
    return collectionsByName[name];
  }
  var collection = {
    type:        'collection',
    id:          utils.getRandomUuid(),
    name:        name,
    pubs:        [],
    fullPubs:    [],
    partialPubs: []
  };
  collections.push(collection);
  collectionsByName[name]  = collection;
  itemsById[collection.id] = collection;
  return collection;
}

function ensureYear(name) {
  if (name in yearsByName) {
    return yearsByName[name];
  }
  var year = {
    type:        'year',
    id:          utils.getRandomUuid(),
    name:        name,
    pubs:        [],
    fullPubs:    [],
    partialPubs: []
  };
  years.push(year);
  yearsByName[name]  = year;
  itemsById[year.id] = year;
  return year;
}

function getPubAuthors(rawPub) {
  var names = (
    rawPub.author ?
      [rawPub.author] :
      rawPub.authors);
  return (
    names && names.map(ensureAuthor));
}

function getPubCollections(rawPub) {
  var names = (
    rawPub.collection ?
      [rawPub.collection] :
      rawPub.collections);
  return (
    names && names.map(ensureCollection));
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

function ensurePartialPub(rawPub, reverseCitation) {
  var authors = getPubAuthors(rawPub);
  var name    = getPubName(authors, rawPub);
  var year    = getPubYear(rawPub);
  var pub;
  if (!(name in pubsByName)) {
    pub = {
      type:             'pub',
      id:               utils.getRandomUuid(),
      title:            rawPub.title,
      authors:          authors,
      year:             year,
      signature:        getPubSignature(authors, rawPub),
      name:             name,
      isPartial:        true,
      reverseCitations: []
    };
    pubs.push(pub);
    pubsByName[name]  = pub;
    itemsById[pub.id] = pub;
  } else {
    pub = pubsByName[name];
  }
  if (reverseCitation) {
    utils.assign(pub, {
        reverseCitations: pub.reverseCitations.concat([reverseCitation])
      });
  }
  if (authors) {
    authors.forEach(function (author) {
        if (author.pubs.indexOf(pub) === -1) {
          author.pubs.push(pub);
        }
      });
  }
  if (year && year.pubs.indexOf(pub) === -1) {
    year.pubs.push(pub);
  }
  return pub;
}

function ensurePub(rawPub) {
  var collections = getPubCollections(rawPub);
  var pub         = ensurePartialPub(rawPub);
  if (!pub.isPartial) {
    console.warning('Duplicate pub:', rawPub, pub);
  }
  utils.assign(pub, {
      citations:   (rawPub.citations || []).map(function (citation) {
          return ensurePartialPub(citation, pub);
        }),
      basename:    rawPub.basename,
      collections: collections,
      abstract:    rawPub.abstract,
      isNumbered:  !rawPub.numbered || rawPub.numbered === 'y',
      isPartial:   rawPub.partial === 'y'
    });
  if (collections) {
    collections.forEach(function (collection) {
        if (collection.pubs.indexOf(pub) === -1) {
          collection.pubs.push(pub);
        }
      });
  }
  return pub;
}

module.exports = {
  processDb: function () {
    rawPubs.forEach(function (rawPub) {
        ensurePub(rawPub);
      });
    pubs.sort(function (pub1, pub2) {
        return pub1.name.localeCompare(pub2.name);
      });
    var fullPubs    = [];
    var partialPubs = [];
    pubs.forEach(function (pub) {
        pub.reverseCitations.sort(function (citation1, citation2) {
            return citation1.name.localeCompare(citation2.name);
          });
        if (!pub.isPartial) {
          fullPubs.push(pub);
          (pub.authors || []).forEach(function (author) {
              author.fullPubs.push(pub);
            });
          (pub.collections || []).forEach(function (collection) {
              collection.fullPubs.push(pub);
            });
          if (pub.year) {
            pub.year.fullPubs.push(pub);
          }
        } else {
          partialPubs.push(pub);
          (pub.authors || []).forEach(function (author) {
              author.partialPubs.push(pub);
            });
          (pub.collections || []).forEach(function (collection) {
              collection.partialPubs.push(pub);
            });
          if (pub.year) {
            pub.year.partialPubs.push(pub);
          }
        }
      });
    authors.sort(function (author1, author2) {
        return author1.basename.localeCompare(author2.basename) || author1.name.localeCompare(author2.name);
      });
    collections.sort(function (collection1, collection2) {
        return collection1.name.localeCompare(collection2.name);
      });
    years.sort(function (year1, year2) {
        return ('' + year1.name).localeCompare('' + year2.name);
      });
    return {
      pubs:        pubs,
      fullPubs:    fullPubs,
      partialPubs: partialPubs,
      authors:     authors,
      collections: collections,
      years:       years,
      itemsById:   itemsById
    };
  }
};
