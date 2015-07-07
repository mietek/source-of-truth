'use strict';

var utils = require('../common/utils');

var _ = module.exports = {
  untaggedId: 'untagged',

  process: function (rawTag) {
    var isUntagged = !rawTag;
    var name;
    var id;
    if (isUntagged) {
      name = 'untagged';
      id   = _.untaggedId;
    } else {
      name = rawTag.name;
      id   = utils.latinize(name);
    }
    return {
      type:         'tag',
      name:         name,
      id:           id,
      pubs:         [],
      fullCount:    0,
      partialCount: 0,
      isUntagged:   isUntagged
    };
  },

  compare: function (tag1, tag2) {
    if (tag1.isUntagged) {
      return 1;
    }
    if (tag2.isUntagged) {
      return -1;
    }
    return tag1.name.localeCompare(tag2.name);
  },

  sort: function (all) {
    all.sort(_.compare);
  },

  processAll: function (rawTags) {
    var byName = {};
    var byId   = {};
    var all    = [];
    rawTags.forEach(function (rawTag) {
        var tag = _.process(rawTag);
        if (tag.name in byName || tag.id in byId) {
          console.error('Duplicate tag:', tag.name, tag.id);
        } else {
          byName[tag.name] = tag;
          byId[tag.id]     = tag;
          all.push(tag);
        }
      });
    _.sort(all);
    return {
      byName:       byName,
      byId:         byId,
      all:          all,
      fullCount:    undefined,
      partialCount: undefined
    };
  },

  lookupAll: function (rawNames, tagInfo) {
    return rawNames.map(function (rawName) {
        if (!(rawName in tagInfo.byName)) {
          console.error('Missing tag:', rawName);
          return undefined;
        }
        return tagInfo.byName[rawName];
      }).filter(function (tag) {
        return !!tag;
      });
  },

  count: function (tagInfo) {
    var fullCount    = 0;
    var partialCount = 0;
    tagInfo.all.forEach(function (tag) {
        if (!!tag.fullCount) {
          fullCount += 1;
        } else {
          partialCount += 1;
        }
      });
    utils.assign(tagInfo, {
        fullCount:    fullCount,
        partialCount: partialCount
      });
  }
};
