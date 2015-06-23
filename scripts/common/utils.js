'use strict';

function pad(n) {
  return (
    n < 10 ? '0' + n :
      '' + n);
}

var _ = module.exports = {
  assign: require('object-assign'),

  ensure: function (object, key, defaultValue) {
    if (!(key in object)) {
      object[key] = defaultValue;
    }
    return object[key];
  },

  getRandomUuid: require('node-uuid').v4,

  getSortedKeys: function (object, compare) {
    return Object.keys(object || {}).sort(compare || function (key1, key2) {
        return key1.localeCompare(key2);
      });
  },

  formatYear: function (dateTime) {
    return (
      !dateTime ? null :
        '' + dateTime.getUTCFullYear());
  },

  formatMonth: function (dateTime) {
    return (
      !dateTime ? null :
        pad(dateTime.getUTCMonth() + 1));
  },

  formatDay: function (dateTime) {
    return (
      !dateTime ? null :
        pad(dateTime.getUTCDate()));
  },

  formatDate: function (dateTime) {
    return (
      !dateTime ? null :
        _.formatYear(dateTime) + '-' +
        _.formatMonth(dateTime) + '-' +
        _.formatDay(dateTime));
  },

  formatHour: function (dateTime) {
    return (
      !dateTime ? null :
        pad(dateTime.getUTCHours()));
  },

  formatMinute: function (dateTime) {
    return (
      !dateTime ? null :
        pad(dateTime.getUTCMinutes()));
  },

  formatSecond: function (dateTime) {
    return (
      !dateTime ? null :
        pad(dateTime.getUTCSeconds()));
  },

  formatTime: function (dateTime) {
    return (
      !dateTime ? null :
        _.formatHour(dateTime) + ':' +
        _.formatMinute(dateTime) + ':' +
        _.formatSecond(dateTime));
  },

  formatDateTime: function (dateTime) {
    return (
      !dateTime ? null :
        _.formatDate(dateTime) + ' ' +
        _.formatTime(dateTime));
  },

  formatRelativeDateTime: require('relative-date'),

  parseDateTime: function (rawDateTime) {
    return (
      !rawDateTime ? null :
        new Date(rawDateTime.split(' ').join('T')));
  },

  storeJson: function (key, value) {
    if (value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  },

  loadJson: function (key, defaultValue) {
    var value = localStorage.getItem(key);
    return (
      value !== null ? JSON.parse(value) :
        defaultValue);
  }
};
