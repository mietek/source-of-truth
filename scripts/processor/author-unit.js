'use strict';

var utils = require('../common/utils');

var _ = module.exports = {
  unknownId: 'unknown-author',

  recoverLastName: function (tokens) {
    return tokens[tokens.length - 1];
  },

  getSortingLastName: function (lastName) {
    var parts = lastName.split(' ');
    if (parts.length > 1) {
      var firstPart   = parts[0].toLowerCase();
      var isSkippable = (
        firstPart === 'de' ||
        firstPart === 'des' ||
        firstPart === 'di' ||
        firstPart === 'van');
      if (isSkippable) {
        return parts.slice(1).join(' ');
      }
    }
    return lastName;
  },

  shorten: function (dotlessInitial) {
    return dotlessInitial.split('-').map(function (part) {
        return part[0];
      }).join('-');
  },

  addDots: function (dotlessShortInitial) {
    return dotlessShortInitial.split('-').join('.-') + '.';
  },

  recoverInitials: function (tokens) {
    var dotlessInitials = tokens.slice(0, tokens.length - 1);
    return dotlessInitials.map(function (dotlessInitial) {
        var dotlessShortInitial = _.shorten(dotlessInitial);
        var shortInitial        = _.addDots(dotlessShortInitial);
        return dotlessShortInitial === dotlessInitial ? shortInitial : dotlessInitial;
      });
  },

  shortenInitials: function (initials) {
    return initials.map(function (initial) {
        var dotlessInitial      = initial.replace(/\./g, '');
        var dotlessShortInitial = _.shorten(dotlessInitial);
        var shortInitial        = _.addDots(dotlessShortInitial);
        return shortInitial;
      });
  },

  areInitialsSame: function (initials, otherInitials) {
    return initials.every(function (initial, initialIx) {
        var dotlessInitial           = initial.replace(/\./g, '');
        var dotlessShortInitial      = _.shorten(dotlessInitial);
        var otherDotlessInitial      = otherInitials[initialIx].replace(/\./g, '');
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

  processName: function (lastName, initials) {
    if (!initials.length) {
      return {
        shortInitials:    [],
        shortName:        lastName,
        fullName:         lastName,
        reverseShortName: lastName,
        reverseFullName:  lastName,
        sortingName:      lastName
      };
    }
    var shortInitials    = _.shortenInitials(initials);
    var shortInitialPart = shortInitials.join(' ');
    var initialPart      = initials.join(' ');
    var sortingLastName  = _.getSortingLastName(lastName);
    return {
      shortInitials:    shortInitials,
      shortName:        shortInitialPart + ' ' + lastName,
      fullName:         initialPart + ' ' + lastName,
      reverseShortName: lastName + ', ' + shortInitialPart,
      reverseFullName:  lastName + ', ' + initialPart,
      sortingName:      sortingLastName + ', ' + initialPart
    };
  },

  extractAuthors: function (rawPub) {
    var rawNames = rawPub.authors || [rawPub.author];
    (rawPub.citations || []).forEach(function (rawCitation) {
        rawNames = rawNames.concat(rawCitation.authors || [rawCitation.author]);
      });
    return rawNames;
  },

  process: function (rawName) {
    var isUnknown = (
      !rawName ||
      rawName === 'et al' ||
      rawName === 'et al.' ||
      rawName === 'unknown');
    var rawNames;
    var lastName;
    var initials;
    var name;
    var id;
    if (isUnknown) {
      rawNames = ['unknown'];
      lastName = 'unknown author';
      initials = [];
      name     = 'unknown author';
      id       = _.unknownId;
    } else {
      var tokens = rawName.replace(/\.-/g, '-').split(/[\. ]/).filter(function (token) {
          return !!token.length;
        });
      rawNames = [rawName];
      lastName = _.recoverLastName(tokens);
      initials = _.recoverInitials(tokens);
      name     = undefined;
      id       = undefined;
    }
    return utils.assign({
        type:         'author',
        rawNames:     rawNames,
        lastName:     lastName,
        initials:     initials,
        name:         name,
        id:           id,
        pubs:         [],
        fullCount:    0,
        partialCount: 0,
        isUnknown:    isUnknown
      },
      _.processName(lastName, initials));
  },

  compare: function (author1, author2) {
    if (author1.isUnknown) {
      return 1;
    }
    if (author2.isUnknown) {
      return -1;
    }
    return author1.sortingName.localeCompare(author2.sortingName);
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
    var rawNames     = utils.getUnion(author.rawNames, otherAuthor.rawNames);
    var commonLength = Math.min(author.initials.length, otherAuthor.initials.length);
    var initials     = [];
    var lessInitials;
    var moreInitials;
    if (author.initials.length < otherAuthor.initials.length) {
      lessInitials = author.initials;
      moreInitials = otherAuthor.initials;
    } else {
      lessInitials = otherAuthor.initials;
      moreInitials = author.initials;
    }
    lessInitials.forEach(function (initial, initialIx) {
        var otherInitial = moreInitials[initialIx];
        if (initial.length < otherInitial.length) {
          initials.push(otherInitial);
        } else {
          initials.push(initial);
        }
      });
    initials = initials.concat(moreInitials.slice(commonLength));
    utils.assign(author, {
        rawNames: rawNames,
        initials: initials
      },
      _.processName(author.lastName, initials));
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
        authors.forEach(function (author, authorIx) {
            if (!author) {
              return;
            }
            var otherAuthors = authors.slice(authorIx + 1);
            otherAuthors.forEach(function (otherAuthor, otherIx) {
                if (!otherAuthor) {
                  return;
                }
                if (_.isAuthorSame(author, otherAuthor)) {
                  _.extendAuthor(author, otherAuthor);
                  otherAuthor.rawNames.forEach(function (otherRawName) {
                      authorInfo.byRawName[otherRawName] = author;
                    });
                  delete authors[authors.indexOf(otherAuthor)];
                  delete otherAuthors[otherIx];
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
      byRawName:    authorInfo.byRawName,
      byId:         byId,
      all:          all,
      fullCount:    undefined,
      partialCount: undefined
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

  count: function (authorInfo) {
    var fullCount    = 0;
    var partialCount = 0;
    authorInfo.all.forEach(function (author) {
        if (!!author.fullCount) {
          fullCount += 1;
        } else {
          partialCount += 1;
        }
      });
    utils.assign(authorInfo, {
        fullCount:    fullCount,
        partialCount: partialCount
      });
  }
};
