'use strict';

var utils = require('../common/utils');
var authorUnit = require('./author-unit');
var tagUnit = require('./tag-unit');
var yearUnit = require('./year-unit');

var _ = module.exports = {
  process: function (rawPub, isCitation, tagInfo, authorInfo, yearInfo) {
    var rawTags    = rawPub.tags || (rawPub.tag && [rawPub.tag]) || [];
    var rawAuthors = rawPub.authors || [rawPub.author];
    var tags       = tagUnit.lookupAll(rawTags, tagInfo);
    var authors    = authorUnit.lookupAll(rawAuthors, authorInfo);
    var year       = yearUnit.lookup(rawPub.year, yearInfo);
    var isNumbered = !rawPub.numbered || rawPub.numbered === 'y';
    var isPartial  = isCitation || rawPub.partial === 'y';
    var key = (
      (!authors[0].isUnknown ? authors[0].name : 'unknown') +
      (!year.isUnknown ? ' ' + year.name : ' unknown'));
    return {
      type:                        'pub',
      uuid:                        utils.getRandomUuid(),
      tags:                        tags,
      authors:                     authors,
      year:                        year,
      title:                       rawPub.title,
      abstract:                    rawPub.abstract,
      key:                         key,
      suffix:                      undefined,
      name:                        undefined,
      id:                          undefined,
      citations:                   [],
      fullCitationCount:           undefined,
      partialCitationCount:        undefined,
      reverseCitations:            [],
      reverseCitationCount:        undefined,
      partialReverseCitationCount: undefined,
      isNumbered:                  isNumbered,
      isPartial:                   isPartial
    };
  },

  compareTitles: function (pub1, pub2) {
    if (pub1.authors[0].isUnknown) {
      return 1;
    }
    if (pub2.authors[0].isUnknown) {
      return -1;
    }
    return pub1.title.localeCompare(pub2.title);
  },

  compare: function (pub1, pub2) {
    if (pub1.authors[0].isUnknown) {
      return 1;
    }
    if (pub2.authors[0].isUnknown) {
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

  partitionAll: function (rawPubs, tagInfo, authorInfo, yearInfo) {
    var allByKey = {};
    rawPubs.forEach(function (rawPub) {
        var pub = _.process(rawPub, false, tagInfo, authorInfo, yearInfo);
        if (pub.key in allByKey) {
          allByKey[pub.key].push(pub);
        } else {
          allByKey[pub.key] = [pub];
        }
        (rawPub.citations || []).forEach(function (rawCitation) {
            var citation = _.process(rawCitation, true, tagInfo, authorInfo, yearInfo);
            pub.citations.push(citation);
            citation.reverseCitations.push(pub);
            if (citation.key in allByKey) {
              allByKey[citation.key].push(citation);
            } else {
              allByKey[citation.key] = [citation];
            }
          });
      });
    return {
      allByKey: allByKey
    };
  },

  isPubSame: function (pub, otherPub) {
    return (
      pub.key === otherPub.key &&
      pub.title === otherPub.title);
  },

  extendPub: function (pub, otherPub) {
    var reverseCitations = pub.reverseCitations.concat(otherPub.reverseCitations);
    var isPartial        = pub.isPartial && otherPub.isPartial;
    utils.assign(pub,
      !otherPub.tags.length ? null : {
        tags: otherPub.tags
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

  postProcessAll: function (all, tagInfo, authorInfo, yearInfo) {
    var fullCount    = 0;
    var partialCount = 0;
    var untagged     = [tagInfo.byId[tagUnit.untaggedId]];
    all.forEach(function (pub) {
        var fullCitationCount           = 0;
        var partialCitationCount        = 0;
        var fullReverseCitationCount    = 0;
        var partialReverseCitationCount = 0;
        pub.citations.forEach(function (citation) {
            if (!citation.isPartial) {
              fullCitationCount += 1;
            } else {
              partialCitationCount += 1;
            }
          });
        pub.reverseCitations.forEach(function (reverseCitation) {
            if (!reverseCitation.isPartial) {
              fullReverseCitationCount += 1;
            } else {
              partialReverseCitationCount += 1;
            }
          });
        utils.assign(pub, {
            fullCitationCount:           fullCitationCount,
            partialCitationCount:        partialCitationCount,
            fullReverseCitationCount:    fullReverseCitationCount,
            partialReverseCitationCount: partialReverseCitationCount
          });
        if (!pub.isPartial) {
          fullCount += 1;
        } else {
          partialCount += 1;
        }
        (pub.tags.length ? pub.tags : untagged).forEach(function (tag) {
            tag.pubs.push(pub);
            if (!pub.isPartial) {
              tag.fullCount += 1;
            } else {
              tag.partialCount += 1;
            }
          });
        pub.authors.forEach(function (author) {
            author.pubs.push(pub);
            if (!pub.isPartial) {
              author.fullCount += 1;
            } else {
              author.partialCount += 1;
            }
          });
        pub.year.pubs.push(pub);
        if (!pub.isPartial) {
          pub.year.fullCount += 1;
        } else {
          pub.year.partialCount += 1;
        }
      });
    return {
      fullCount:    fullCount,
      partialCount: partialCount
    };
  },

  processAll: function (rawPubs, tagInfo, authorInfo, yearInfo) {
    var byId    = {};
    var all     = [];
    var pubInfo = _.partitionAll(rawPubs, tagInfo, authorInfo, yearInfo);
    Object.keys(pubInfo.allByKey).forEach(function (key) {
        var pubs           = pubInfo.allByKey[key];
        var isKeyAmbiguous = false;
        pubs.forEach(function (pub, pubIx) {
            if (!pub) {
              return;
            }
            var otherPubs = pubs.slice(pubIx + 1);
            otherPubs.forEach(function (otherPub, otherIx) {
                if (!otherPub) {
                  return;
                }
                if (_.isPubSame(pub, otherPub)) {
                  _.extendPub(pub, otherPub);
                  otherPub.citations.forEach(function (citation) {
                      var thisIx = citation.reverseCitations.indexOf(otherPub);
                      citation.reverseCitations[thisIx] = pub;
                    });
                  otherPub.reverseCitations.forEach(function (reverseCitation) {
                      var thatIx = reverseCitation.citations.indexOf(otherPub);
                      reverseCitation.citations[thatIx] = pub;
                    });
                  delete pubs[pubs.indexOf(otherPub)];
                  delete otherPubs[otherIx];
                } else {
                  isKeyAmbiguous = true;
                }
              });
          });
        pubs.sort(_.compareTitles);
        var counter = 0;
        pubs.forEach(function (pub) {
            if (!pub) {
              return;
            }
            var suffix;
            var name;
            var id;
            if (!isKeyAmbiguous) {
              suffix = null;
              name   = pub.key;
            } else {
              suffix = _.getSuffix(counter);
              name   = (
                pub.key +
                (pub.year.isUnknown ? ' ' : '') +
                suffix);
              counter += 1;
            }
            id = utils.latinize(name);
            utils.assign(pub, {
                suffix: suffix,
                name:   name,
                id:     id
              });
            byId[pub.id] = pub;
            all.push(pub);
          });
      });
    _.sort(all);
    var postPubInfo = _.postProcessAll(all, tagInfo, authorInfo, yearInfo);
    return {
      byId:         byId,
      all:          all,
      fullCount:    postPubInfo.fullCount,
      partialCount: postPubInfo.partialCount
    };
  }
};
