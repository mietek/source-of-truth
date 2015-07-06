'use strict';

var utils = require('../common/utils');

var _ = module.exports = {
  process: function (rawCollection) {
    var name = rawCollection.name;
    var id   = utils.latinize(name);
    return {
      type:        'collection',
      name:        name,
      id:          id,
      pubs:        [],
      fullPubs:    [],
      partialPubs: [],
      isPartial:   undefined
    };
  },

  compare: function (collection1, collection2) {
    return collection1.name.localeCompare(collection2.name);
  },

  sort: function (all) {
    all.sort(_.compare);
  },

  processAll: function (rawCollections) {
    var byName = {};
    var byId   = {};
    var all    = [];
    rawCollections.forEach(function (rawCollection) {
        var collection = _.process(rawCollection);
        if (collection.name in byName || collection.id in byId) {
          console.error('Duplicate collection:', collection.name, collection.id);
        } else {
          byName[collection.name] = collection;
          byId[collection.id]     = collection;
          all.push(collection);
        }
      });
    _.sort(all);
    return {
      byName:  byName,
      byId:    byId,
      all:     all,
      full:    undefined,
      partial: undefined
    };
  },

  lookupAll: function (rawNames, collectionInfo) {
    return rawNames.map(function (rawName) {
        if (!rawName) {
          return undefined;
        }
        if (!(rawName in collectionInfo.byName)) {
          console.error('Missing collection:', rawName);
          return undefined;
        }
        return collectionInfo.byName[rawName];
      }).filter(function (collection) {
        return !!collection;
      });
  },

  finish: function (collectionInfo) {
    var full    = [];
    var partial = [];
    collectionInfo.all.forEach(function (collection) {
        collection.isPartial = !collection.fullPubs.length;
        (collection.fullPubs.length ? full : partial).push(collection);
      });
    return utils.assign(collectionInfo, {
        full:    full,
        partial: partial
      });
  }
};
