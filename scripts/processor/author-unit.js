'use strict';

var utils = require('../common/utils');

var _ = module.exports = {
  unknownId: 'unknown-author',

  recoverLastName: function (tokens) {
    return tokens[tokens.length - 1];
  },

  shorten: function (dotlessInitial) {
    return dotlessInitial.split('-').map(function (part) {
        return part[0];
      }).join('-');
  },

  recoverInitials: function (tokens) {
    var dotlessInitials = tokens.slice(0, tokens.length - 1);
    var shortInitials   = [];
    var initials        = [];
    dotlessInitials.forEach(function (dotlessInitial) {
        var dotlessShortInitial = _.shorten(dotlessInitial);
        var shortInitial        = dotlessShortInitial.split('-').join('.-') + '.';
        var initial             = dotlessShortInitial === dotlessInitial ? shortInitial : dotlessInitial;
        shortInitials.push(shortInitial);
        initials.push(initial);
      });
    return {
      short:  shortInitials,
      all:    initials,
      length: initials.length
    };
  },

  extractAuthors: function (rawPub) {
    var rawNames = rawPub.authors || [rawPub.author];
    (rawPub.citations || []).forEach(function (rawCitation) {
        rawNames = rawNames.concat(rawCitation.authors || [rawCitation.author]);
      });
    return rawNames;
  },

  areInitialsSame: function (initials, otherInitials) {
    return initials.every(function (initial, index) {
        var dotlessInitial           = initial.replace(/\./g, '');
        var dotlessShortInitial      = _.shorten(dotlessInitial);
        var otherDotlessInitial      = otherInitials[index].replace(/\./g, '');
        var otherDotlessShortInitial = _.shorten(otherDotlessInitial);
        if (dotlessShortInitial !== otherDotlessShortInitial) {
          return false;
        }
        var isLongInitial      = dotlessInitial !== dotlessShortInitial;
        var isOtherLongInitial = otherDotlessInitial !== otherDotlessShortInitial;
        if (isLongInitial && isOtherLongInitial && dotlessInitial !== otherDotlessInitial) {
          return false;
        }
        return true;
      });
  },

  process: function (rawName) {
    var isUnknown = (
      !rawName ||
      rawName === 'et al' ||
      rawName === 'et al.' ||
      rawName === 'unknown');
    var rawNames;
    var lastName;
    var shortInitials;
    var initials;
    var shortName;
    var fullName;
    var reverseShortName;
    var reverseFullName;
    var name;
    var id;
    if (isUnknown) {
      rawNames         = ['unknown'];
      lastName         = 'unknown author';
      shortInitials    = [];
      initials         = [];
      shortName        = 'unknown author';
      reverseShortName = 'unknown author';
      fullName         = 'unknown author';
      reverseFullName  = 'unknown author';
      name             = 'unknown author';
      id               = _.unknownId;
    } else {
      var tokens = rawName.replace(/\.-/g, '-').split(/[\. ]/).filter(function (token) {
          return !!token.length;
        });
      var initialInfo = _.recoverInitials(tokens);
      rawNames      = [rawName];
      lastName      = _.recoverLastName(tokens);
      shortInitials = initialInfo.short;
      initials      = initialInfo.all;
      if (initialInfo.length) {
        var shortInitialPart = initialInfo.short.join(' ');
        var initialPart      = initialInfo.all.join(' ');
        shortName        = shortInitialPart + ' ' + lastName;
        fullName         = initialPart + ' ' + lastName;
        reverseShortName = lastName + ', ' + shortInitialPart;
        reverseFullName  = lastName + ', ' + initialPart;
      } else {
        fullName         = lastName;
        shortName        = lastName;
        reverseShortName = lastName;
        reverseFullName  = lastName;
      }
      name = undefined;
      id   = undefined;
    }
    return {
      type:             'author',
      rawNames:         rawNames,
      lastName:         lastName,
      shortInitials:    shortInitials,
      initials:         initials,
      shortName:        shortName,
      fullName:         fullName,
      reverseShortName: reverseShortName,
      reverseFullName:  reverseFullName,
      name:             name,
      id:               id,
      pubs:             [],
      fullPubs:         [],
      partialPubs:      [],
      isUnknown:        isUnknown,
      isPartial:        undefined
    };
  },

  compare: function (author1, author2) {
    if (author1.isUnknown) {
      return 1;
    }
    if (author2.isUnknown) {
      return -1;
    }
    return author1.reverseFullName.localeCompare(author2.reverseFullName);
  },

  sort: function (all) {
    all.sort(_.compare);
  },

  isAuthorSame: function (author, otherAuthor) {
    if (author.fullName === otherAuthor.fullName) {
      return true;
    }
    var commonLength  = Math.min(author.initials.length, otherAuthor.initials.length);
    var initials      = author.initials.slice(0, commonLength);
    var otherInitials = otherAuthor.initials.slice(0, commonLength);
    if (!_.areInitialsSame(initials, otherInitials)) {
      return false;
    }
    return true;
  },

  extendAuthor: function (author, otherAuthor) {
    if (author.fullName.length < otherAuthor.fullName.length) {
      utils.assign(author, {
          shortInitials:    otherAuthor.shortInitials,
          initials:         otherAuthor.initials,
          shortName:        otherAuthor.shortName,
          reverseShortName: otherAuthor.reverseShortName,
          fullName:         otherAuthor.fullName,
          reverseFullName:  otherAuthor.reverseFullName
        });
    }
    var rawNames = utils.getUnion(author.rawNames, otherAuthor.rawNames);
    utils.assign(author, {
        rawNames: rawNames,
      });
  },

  partitionAll: function (rawPubs) {
    var byRawName     = {};
    var byFullName    = {};
    var allByLastName = {};
    rawPubs.forEach(function (rawPub) {
        var rawNames = _.extractAuthors(rawPub);
        rawNames.forEach(function (rawName) {
            var author;
            if (rawName in byRawName) {
              author = byRawName[rawName];
            } else {
              author = _.process(rawName);
              if (author.fullName in byFullName) {
                author = byFullName[author.fullName];
                author.rawNames.push(rawName);
                byRawName[rawName] = author;
              } else {
                byRawName[rawName]  = author;
                byFullName[author.fullName] = author;
                if (author.lastName in allByLastName) {
                  allByLastName[author.lastName].push(author);
                } else {
                  allByLastName[author.lastName] = [author];
                }
              }
            }
          });
      });
    return {
      byRawName:     byRawName,
      allByLastName: allByLastName
    };
  },

  processAll: function (rawPubs) {
    var byId       = {};
    var all        = [];
    var authorInfo = _.partitionAll(rawPubs);
    Object.keys(authorInfo.allByLastName).forEach(function (lastName) {
        var authors              = authorInfo.allByLastName[lastName];
        var isLastNameAmbiguous  = false;
        var isShortNameAmbiguous = false;
        authors.forEach(function (author, index) {
            if (!author) {
              return;
            }
            var otherAuthors = authors.slice(index + 1);
            otherAuthors.forEach(function (otherAuthor, otherIndex) {
                if (!otherAuthor) {
                  return;
                }
                if (_.isAuthorSame(author, otherAuthor)) {
                  _.extendAuthor(author, otherAuthor);
                  otherAuthor.rawNames.forEach(function (otherRawName) {
                      authorInfo.byRawName[otherRawName] = author;
                    });
                  delete authors[authors.indexOf(otherAuthor)];
                  delete otherAuthors[otherIndex];
                } else {
                  isLastNameAmbiguous = true;
                }
              });
            if (!isShortNameAmbiguous && otherAuthors.some(function (otherAuthor) {
                  return author.shortName === otherAuthor.shortName;
                })) {
              isShortNameAmbiguous = true;
            }
            if (!author.isUnknown) {
              var name;
              var id;
              if (!isLastNameAmbiguous) {
                name = author.lastName;
              } else if (!isShortNameAmbiguous) {
                name = author.reverseShortName;
              } else {
                name = author.reverseFullName;
                console.warn('Ambiguous author:', author.reverseFullName);
              }
              id = utils.latinize(name);
              utils.assign(author, {
                  name: name,
                  id:   id
                });
            }
            byId[author.id] = author;
            all.push(author);
          });
      });
    _.sort(all);
    return {
      byRawName: authorInfo.byRawName,
      byId:      byId,
      all:       all
    };
  },

  lookupAll: function (rawNames, authorInfo) {
    return rawNames.map(function (rawName) {
        if (!rawName) {
          return authorInfo.byId[_.unknownId];
        }
        if (!(rawName in authorInfo.byRawName)) {
          console.error('Missing author:', rawName);
          return undefined;
        }
        return authorInfo.byRawName[rawName];
      });
  },

  finish: function (authorInfo) {
    var full    = [];
    var partial = [];
    authorInfo.all.forEach(function (author) {
        author.isPartial = !author.fullPubs.length;
        (author.fullPubs.length ? full : partial).push(author);
      });
    return utils.assign(authorInfo, {
        full:    full,
        partial: partial
      });
  }
};
