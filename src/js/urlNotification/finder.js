'use strict';

const config = require('./config');
const storage = require('./storage');

/**
 * @typedef {object} FoundItem
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} fontColor
 * @property {string} displayPosition
 */

/**
 * Find pattern for content script.
 *
 * Conditions:
 * - PatternItem.status is 1
 * - PatternItem.url matches url
 *
 * @param {string} url
 * @returns {(FoundItem|null)}
 */
const find = function(url) {
  let i, len, patterns = storage.getAll();

  for (i = 0, len = patterns.length; i < len; i++) {
    if (patterns[i].status === 1 && makeRegExp(patterns[i].url).test(url)) {
      return createData(patterns[i]);
    }
  }

  return null;
};

/**
 * @param {string} url
 * @returns {RegExp}
 */
const makeRegExp = function(url) {
  return new RegExp(convertForMatching(url));
};

/**
 * @param {string} url
 * @returns {string}
 */
const convertForMatching = function(url) {
  return url.
    replace(/[/.+\-?]/g, function(matched) {
      return '\\' + matched;
    }).
    replace(/\*/g, function() {
      return '[0-9a-zA-Z-_]+';
    });
};

/**
 * @param {PatternItem} item
 * @returns {FoundItem}
 */
const createData = function(item) {
  return {
    url: item.url,
    message: item.msg,
    backgroundColor: item.backgroundColor,
    fontColor: config.defaultFontColor(),
    displayPosition: item.displayPosition,
  };
};

module.exports.findFor = find;
