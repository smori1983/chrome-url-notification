'use strict';

const config = require('./config');
const storage = require('./storage');
const deepMerge = require('deepmerge');

/**
 * @typedef {object} FindOption
 * @property {boolean} ignoreStatus
 */

/**
 * @typedef {object} FoundItem
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} fontColor
 * @property {string} displayPosition
 * @property {number} [status]
 */

/**
 * Find pattern for content script.
 *
 * Conditions:
 * - PatternItem.status is 1 (if option.ignoreStatus is false)
 * - PatternItem.url matches url
 *
 * @param {string} url
 * @param {FindOption} [option]
 * @returns {(FoundItem|null)}
 */
const find = function(url, option) {
  let i, len;

  option = deepMerge(defaultFindOption(), option || {});

  /** @type {PatternItem[]} */
  const patterns = storage.getAll();

  for (i = 0, len = patterns.length; i < len; i++) {
    if (makeRegExp(patterns[i].url).test(url)) {
      if (option.ignoreStatus === true) {
        return createData(patterns[i], option);
      }

      if (option.ignoreStatus === false && patterns[i].status === 1) {
        return createData(patterns[i], option);
      }
    }
  }

  return null;
};

/**
 * @returns {FindOption}
 */
const defaultFindOption = function () {
  return {
    ignoreStatus: false,
  };
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
  return url
    .replace(/[/.+\-?]/g, function(matched) {
      return '\\' + matched;
    })
    .replace(/\*/g, function() {
      return '[0-9a-zA-Z-_]+';
    });
};

/**
 * @param {PatternItem} item
 * @param {FindOption} option
 * @returns {FoundItem}
 */
const createData = function(item, option) {
  const additional = option.ignoreStatus ? {
    status: item.status,
  } : {};

  return deepMerge({
    url: item.url,
    message: item.msg,
    backgroundColor: item.backgroundColor,
    fontColor: config.defaultFontColor(),
    displayPosition: item.displayPosition,
  }, additional);
};

module.exports.findFor = find;
