'use strict';

var utils = require('../common/utils');

var _ = module.exports = {
  unknownId: 'unknown-year',

  extractYears: function (rawPub) {
    var rawNames = [rawPub.year];
    (rawPub.citations || []).forEach(function (rawCitation) {
        rawNames.push(rawCitation.year);
      });
    return rawNames;
  },

  process: function (rawName) {
    var isUnknown = !rawName;
    var name;
    var id;
    if (isUnknown) {
      name = 'unknown year';
      id   = _.unknownId;
    } else {
      name = '' + rawName;
      id   = utils.latinize(name);
    }
    return {
      type:         'year',
      name:         name,
      id:           id,
      pubs:         [],
      fullCount:    0,
      partialCount: 0,
      isUnknown:    isUnknown
    };
  },

  compare: function (year1, year2) {
    if (year1.isUnknown) {
      return 1;
    }
    if (year2.isUnknown) {
      return -1;
    }
    return year1.name.localeCompare(year2.name);
  },

  sort: function (all) {
    all.sort(_.compare);
  },

  processAll: function (rawPubs) {
    var byId = {};
    var all  = [];
    rawPubs.forEach(function (rawPub) {
        var rawNames = _.extractYears(rawPub);
        rawNames.forEach(function (rawName) {
            var year = _.process(rawName);
            if (year.id in byId) {
              year = byId[year.id];
            } else {
              byId[year.id] = year;
              all.push(year);
            }
          });
      });
    _.sort(all);
    return {
      byId:         byId,
      all:          all,
      fullCount:    0,
      partialCount: 0
    };
  },

  lookup: function (rawName, yearInfo) {
    if (!rawName) {
      return yearInfo.byId[_.unknownId];
    }
    var id = utils.latinize('' + rawName);
    if (!(id in yearInfo.byId)) {
      console.error('Missing year:', rawName);
      return undefined;
    }
    return yearInfo.byId[id];
  },

  count: function (yearInfo) {
    var fullCount    = 0;
    var partialCount = 0;
    yearInfo.all.forEach(function (year) {
        if (year.fullCount) {
          fullCount += 1;
        } else {
          partialCount += 1;
        }
      });
    utils.assign(yearInfo, {
        fullCount:    fullCount,
        partialCount: partialCount
      });
  }
};
