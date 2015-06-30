'use strict';

var utils = require('./common/utils');

var rawCollections = require('./database/collections');
var rawPubs = require('./database/pubs');

var collections       = [];
var collectionsByName = {};
var pubs              = [];
var fullPubs          = [];
var partialPubs       = [];
var pubsByName        = {};
var authors           = [];
var fullAuthors       = [];
var partialAuthors    = [];
var authorsByName     = {};
var years             = [];
var fullYears         = [];
var partialYears      = [];
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

var _ = module.exports = {
  processCollection: function (rawCollection) {
    if (rawCollection.name in collectionsByName) {
      console.error('Duplicate collection name:', rawCollection);
      return;
    }
    if (rawCollection.id in itemsById) {
      console.error('Duplicate collection id:', rawCollection);
      return;
    }
    var collection = {
      type:        'collection',
      id:          rawCollection.id,
      name:        rawCollection.name,
      pubs:        [],
      fullPubs:    [],
      partialPubs: []
    };
    collections.push(collection);
    collectionsByName[collection.name] = collection;
    itemsById[collection.id]           = collection;
  },

  processCollections: function () {
    rawCollections.forEach(function (rawCollection) {
        _.processCollection(rawCollection);
      });
    collections.sort(function (collection1, collection2) {
        return collection1.name.localeCompare(collection2.name);
      });
  },

  getCollection: function (name) {
    if (!(name in collectionsByName)) {
      console.error('Missing collection:', name);
      return undefined;
    }
    return collectionsByName[name];
  },

  getPubSignature: function (authors, rawPub) {
    var firstBasename = (
      (authors && authors.length) ?
        authors[0].basename :
        'unknown');
    return (
      firstBasename + (
        (rawPub.year ? ' ' + rawPub.year : '')));
  },

  getPubName: function (authors, rawPub) {
    return (
      _.getPubSignature(authors, rawPub) +
        (' — ' + rawPub.title));
  },

  ensurePartialPub: function (rawPub, reverseCitation) {
    var authorNames = rawPub.author ? [rawPub.author] : rawPub.authors;
    var authors     = authorNames && authorNames.map(ensureAuthor);
    var name        = _.getPubName(authors, rawPub);
    var year        = rawPub.year && ensureYear(rawPub.year);
    var pub;
    if (!(name in pubsByName)) {
      pub = {
        type:             'pub',
        id:               utils.getRandomUuid(),
        title:            rawPub.title,
        authors:          authors,
        year:             year,
        signature:        _.getPubSignature(authors, rawPub),
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
  },

  processPub: function (rawPub) {
    var collectionNames = rawPub.collection ? [rawPub.collection] : rawPub.collections;
    var collections     = collectionNames && collectionNames.map(_.getCollection);
    var pub             = _.ensurePartialPub(rawPub);
    if (!pub.isPartial) {
      console.warning('Duplicate pub:', rawPub, pub);
    }
    utils.assign(pub, {
        citations:   (rawPub.citations || []).map(function (rawCitation) {
            return _.ensurePartialPub(rawCitation, pub);
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
    }  },

  processPubs: function () {
    rawPubs.forEach(function (rawPub) {
        _.processPub(rawPub);
      });
    pubs.sort(function (pub1, pub2) {
        return pub1.name.localeCompare(pub2.name);
      });
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
  },

  processAuthors: function () {
    authors.sort(function (author1, author2) {
        return author1.basename.localeCompare(author2.basename) || author1.name.localeCompare(author2.name);
      });
    authors.forEach(function (author) {
        if (author.fullPubs.length) {
          fullAuthors.push(author);
        } else {
          partialAuthors.push(author);
        }
      });
  },

  processYears: function () {
    years.sort(function (year1, year2) {
        return ('' + year1.name).localeCompare('' + year2.name);
      });
    years.forEach(function (year) {
        if (year.fullPubs.length) {
          fullYears.push(year);
        } else {
          partialYears.push(year);
        }
      });
  },

  processDb: function () {
    _.processCollections();
    _.processPubs();
    _.processAuthors();
    _.processYears();
    return {
      collections:    collections,
      pubs:           pubs,
      fullPubs:       fullPubs,
      partialPubs:    partialPubs,
      authors:        authors,
      fullAuthors:    fullAuthors,
      partialAuthors: partialAuthors,
      years:          years,
      fullYears:      fullYears,
      partialYears:   partialYears,
      itemsById:      itemsById
    };
  }
};
