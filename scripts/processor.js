'use strict';

var latinize = require('latinize');
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
var authorsBySurname  = {};
var years             = [];
var fullYears         = [];
var partialYears      = [];
var yearsByName       = {};
var itemsById         = {};

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
      name:        rawCollection.name,
      id:          rawCollection.id,
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

  getAuthorSurnameSuffix: function (count) {
    if (count < 0 || count > 26) {
      console.error('Invalid count:', count);
      return undefined;
    }
    if (!count) {
      return '';
    }
    return String.fromCharCode('A'.charCodeAt(0) + count - 1);
  },

  getUniqueAuthorSurnameAndId: function (name) {
    if (name === 'et al.' || name === 'unknown') {
      return {
        surname: 'unknown',
        id:      'unknown'
      };
    }
    var tokens      = name.split(' ');
    var baseSurname = tokens[tokens.length - 1];
    var baseId      = latinize(baseSurname.toLowerCase()).replace(/[^a-z]/g, '-');
    if (!(baseSurname in authorsBySurname) && !(baseId in itemsById)) {
      return {
        surname: baseSurname,
        id:      baseId
      };
    }
    console.warn('Possibly duplicate author name:', name);
    var count = 0;
    var surname;
    var id;
    do {
      count += 1;
      var suffix = _.getAuthorSurnameSuffix(count);
      surname = baseSurname + ' ' + suffix;
      id      = baseId + '-' + suffix.toLowerCase();
    } while (surname in authorsBySurname || id in itemsById);
    return {
      surname: surname,
      id:      id
    };
  },

  processAuthor: function (name) {
    if (name in authorsByName) {
      return authorsByName[name];
    }
    var author  = utils.assign({
        type:        'author',
        name:        name,
        pubs:        [],
        fullPubs:    [],
        partialPubs: []
      }, _.getUniqueAuthorSurnameAndId(name));
    authors.push(author);
    authorsByName[name]              = author;
    authorsBySurname[author.surname] = author;
    itemsById[author.id]             = author;
    return author;
  },

  getCollection: function (name) {
    if (!(name in collectionsByName)) {
      console.error('Missing collection:', name);
      return undefined;
    }
    return collectionsByName[name];
  },

  getPubSignature: function (authors, rawPub) {
    var firstId = (
      (authors && authors.length) ?
        authors[0].surname :
        'unknown');
    return (
      firstId + (
        (rawPub.year ? ' ' + rawPub.year : '')));
  },

  ensurePartialPub: function (rawPub, reverseCitation) {
    var authorNames = rawPub.author ? [rawPub.author] : rawPub.authors;
    var authors     = authorNames && authorNames.map(_.processAuthor);
    var name        = _.getPubSignature(authors, rawPub) + ' — ' + rawPub.title;
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
        return author1.surname.localeCompare(author2.surname) || author1.name.localeCompare(author2.name);
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
    _.processAuthor('unknown');
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
