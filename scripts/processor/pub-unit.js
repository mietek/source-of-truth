'use strict';

var utils = require('../common/utils');
var collectionUnit = require('./collection-unit');
var authorUnit = require('./author-unit');
var yearUnit = require('./year-unit');

var _ = module.exports = {
  process: function (rawPub, isCitation, collectionInfo, authorInfo, yearInfo) {
    var rawCollections = rawPub.collections || [rawPub.collection];
    var rawAuthors     = rawPub.authors || [rawPub.author];
    var collections    = collectionUnit.lookupAll(rawCollections, collectionInfo);
    var authors        = authorUnit.lookupAll(rawAuthors, authorInfo);
    var year           = yearUnit.lookup(rawPub.year, yearInfo);
    var isNumbered     = !rawPub.numbered || rawPub.numbered === 'y';
    var isPartial      = isCitation || rawPub.partial === 'y';
    var signature      = (
      (authors[0].id !== authorUnit.unknownId ? authors[0].name : 'unknown') +
      (year.id !== yearUnit.unknownId ? ' ' + year.name : ' unknown'));
    return {
      type:             'pub',
      uuid:             utils.getRandomUuid(),
      collections:      collections,
      authors:          authors,
      year:             year,
      title:            rawPub.title,
      abstract:         rawPub.abstract,
      signature:        signature,
      name:             undefined,
      id:               undefined,
      citations:        [],
      reverseCitations: [],
      isNumbered:       isNumbered,
      isPartial:        isPartial
    };
  },

  compareTitles: function (pub1, pub2) {
    if (pub1.authors[0].id === authorUnit.unknownId) {
      return 1;
    }
    if (pub2.authors[0].id === authorUnit.unknownId) {
      return -1;
    }
    return pub1.title.localeCompare(pub2.title);
  },

  compare: function (pub1, pub2) {
    if (pub1.authors[0].id === authorUnit.unknownId) {
      return 1;
    }
    if (pub2.authors[0].id === authorUnit.unknownId) {
      return -1;
    }
    return pub1.name.localeCompare(pub2.name);
  },

  sort: function (all) {
    all.sort(_.compare);
    all.forEach(function (pub) {
        pub.reverseCitations.sort(_.compare);
      });
  },

  partitionAll: function (rawPubs, collectionInfo, authorInfo, yearInfo) {
    var allBySignature = {};
    rawPubs.forEach(function (rawPub) {
        var pub = _.process(rawPub, false, collectionInfo, authorInfo, yearInfo);
        if (pub.signature in allBySignature) {
          allBySignature[pub.signature].push(pub);
        } else {
          allBySignature[pub.signature] = [pub];
        }
        (rawPub.citations || []).forEach(function (rawCitation) {
            var citation = _.process(rawCitation, true, collectionInfo, authorInfo, yearInfo);
            pub.citations.push(citation);
            citation.reverseCitations.push(pub);
            if (citation.signature in allBySignature) {
              allBySignature[citation.signature].push(citation);
            } else {
              allBySignature[citation.signature] = [citation];
            }
          });
      });
    return {
      allBySignature: allBySignature
    };
  },

  isPubSame: function (pub, otherPub) {
    return (
      pub.signature === otherPub.signature &&
      pub.title === otherPub.title);
  },

  extendPub: function (pub, otherPub) {
    var reverseCitations = pub.reverseCitations.concat(otherPub.reverseCitations);
    var isPartial        = pub.isPartial && otherPub.isPartial;
    utils.assign(pub,
      !otherPub.collections.length ? null : {
        collections: otherPub.collections
      },
      !otherPub.abstract ? null : {
        abstract: otherPub.abstract
      },
      !otherPub.citations.length ? null : {
        citations:  otherPub.citations,
        isNumbered: otherPub.numbered
      }, {
        reverseCitations: reverseCitations,
        isPartial:        isPartial
      });
  },

  getSuffix: function (n) {
    var baseCode = 'a'.charCodeAt(0);
    var suffix   = '';
    while (n > 25) {
      var k = n % 26;
      n /= 26;
      suffix = String.fromCharCode(baseCode + k) + suffix;
    }
    return String.fromCharCode(baseCode + n) + suffix;
  },

  processAll: function (rawPubs, collectionInfo, authorInfo, yearInfo) {
    var byId    = {};
    var all     = [];
    var full    = [];
    var partial = [];
    var pubInfo = _.partitionAll(rawPubs, collectionInfo, authorInfo, yearInfo);
    Object.keys(pubInfo.allBySignature).forEach(function (signature) {
        var pubs                 = pubInfo.allBySignature[signature];
        var isSignatureAmbiguous = false;
        pubs.forEach(function (pub, index) {
            if (!pub) {
              return;
            }
            var otherPubs = pubs.slice(index + 1);
            otherPubs.forEach(function (otherPub, otherIndex) {
                if (!otherPub) {
                  return;
                }
                if (_.isPubSame(pub, otherPub)) {
                  _.extendPub(pub, otherPub);
                  otherPub.citations.forEach(function (citation) {
                      var index = citation.reverseCitations.indexOf(otherPub);
                      citation.reverseCitations[index] = pub;
                    });
                  otherPub.reverseCitations.forEach(function (reverseCitation) {
                      var index = reverseCitation.citations.indexOf(otherPub);
                      reverseCitation.citations[index] = pub;
                    });
                  delete pubs[pubs.indexOf(otherPub)];
                  delete otherPubs[otherIndex];
                } else {
                  isSignatureAmbiguous = true;
                }
              });
          });
        pubs.sort(_.compareTitles);
        var counter = 0;
        pubs.forEach(function (pub) {
            if (!pub) {
              return;
            }
            if (!isSignatureAmbiguous) {
              pub.name = pub.signature;
            } else {
              pub.name = (
                pub.signature +
                (pub.year.id === yearUnit.unknownId ? ' ' : '') +
                _.getSuffix(counter));
              counter += 1;
            }
            pub.id = utils.latinize(pub.name);
            byId[pub.id] = pub;
            all.push(pub);
          });
      });
    _.sort(all);
    all.forEach(function (pub) {
        (!pub.isPartial ? full : partial).push(pub);
        (pub.collections || []).forEach(function (collection) {
            collection.pubs.push(pub);
            (!pub.isPartial ? collection.fullPubs : collection.partialPubs).push(pub);
          });
        (pub.authors || []).forEach(function (author) {
            author.pubs.push(pub);
            (!pub.isPartial ? author.fullPubs : author.partialPubs).push(pub);
          });
        if (pub.year) {
          pub.year.pubs.push(pub);
          (!pub.isPartial ? pub.year.fullPubs : pub.year.partialPubs).push(pub);
        }
      });
    return {
      byId:    byId,
      all:     all,
      full:    full,
      partial: partial
    };
  }
};
