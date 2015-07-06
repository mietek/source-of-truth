'use strict';

var utils = require('./common/utils');
var collectionUnit = require('./processor/collection-unit');
var authorUnit = require('./processor/author-unit');
var yearUnit = require('./processor/year-unit');
var pubUnit = require('./processor/pub-unit');

var rawCollections = require('./database/collections');
var rawPubs = require('./database/pubs');

module.exports = {
  processDatabase: function () {
    var collectionInfo = collectionUnit.processAll(rawCollections);
    var authorInfo     = authorUnit.processAll(rawPubs);
    var yearInfo       = yearUnit.processAll(rawPubs);
    var pubInfo        = pubUnit.processAll(rawPubs, collectionInfo, authorInfo, yearInfo);
    collectionUnit.finish(collectionInfo);
    authorUnit.finish(authorInfo);
    yearUnit.finish(yearInfo);
    var itemsById      = utils.assign({}, collectionInfo.byId, authorInfo.byId, yearInfo.byId, pubInfo.byId);
    return {
      collections: collectionInfo,
      authors:     authorInfo,
      years:       yearInfo,
      pubs:        pubInfo,
      itemsById:   itemsById
    };
  }
};
