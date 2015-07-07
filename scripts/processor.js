'use strict';

var utils = require('./common/utils');
var authorUnit = require('./processor/author-unit');
var pubUnit = require('./processor/pub-unit');
var tagUnit = require('./processor/tag-unit');
var yearUnit = require('./processor/year-unit');

var rawPubs = require('./database/pubs');
var rawTags = require('./database/tags');

module.exports = {
  processDatabase: function () {
    var tagInfo    = tagUnit.processAll(rawTags.concat([undefined]));
    var authorInfo = authorUnit.processAll(rawPubs);
    var yearInfo   = yearUnit.processAll(rawPubs);
    var pubInfo    = pubUnit.processAll(rawPubs, tagInfo, authorInfo, yearInfo);
    tagUnit.finish(tagInfo);
    authorUnit.finish(authorInfo);
    yearUnit.finish(yearInfo);
    var itemsById      = utils.assign({}, tagInfo.byId, authorInfo.byId, yearInfo.byId, pubInfo.byId);
    return {
      tags:      tagInfo,
      authors:   authorInfo,
      years:     yearInfo,
      pubs:      pubInfo,
      itemsById: itemsById
    };
  }
};
