'use strict';

const deepMerge = require('deepmerge');
const validator = require('../src/js/urlNotification/validator');

const clearStorage = function() {
  localStorage.clear();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const setUpStorage = function(version, patterns) {
  localStorage.clear();
  localStorage.setItem('version', version);
  localStorage.setItem('pattern', JSON.stringify(patterns));
};

/**
 * @returns {number}
 */
const currentVersion = function() {
  return 3;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const isValidJson = function(json) {
  return validator.forImportJson(json) === true;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const isNotValidJson = function(json) {
  return validator.forImportJson(json) === false;
};

/**
 * @typedef {Object} FoundItemDiff
 * @property {string} [url]
 * @property {string} [message]
 * @property {string} [backgroundColor]
 * @property {string} [fontColor]
 * @property {string} [displayPosition]
 * @property {number} [status]
 */

/**
 * @param {FoundItemDiff} diff
 * @returns {FoundItem}
 */
const makeFoundItem = function(diff) {
  /** @type {FoundItem} */
  const base = {
    url: 'https://example.com/',
    message: 'example',
    backgroundColor: '000000',
    fontColor: 'ffffff',
    displayPosition: 'bottom',
    status: 1,
  };

  return deepMerge(base, diff);
};

module.exports.clearStorage = clearStorage;
module.exports.setUpStorage = setUpStorage;
module.exports.currentVersion = currentVersion;
module.exports.isValidJson = isValidJson;
module.exports.isNotValidJson = isNotValidJson;
module.exports.makeFoundItem = makeFoundItem;
