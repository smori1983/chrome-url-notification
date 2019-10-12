'use strict';

const fs = require('fs');
const deepMerge = require('deepmerge');
const validator = require('../src/js/urlNotification/validator');
const storage = require('./storage');

const clearStorage = function() {
  storage.clearStorage();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const setUpStorage = function(version, patterns) {
  storage.setUpStorage(version, patterns);
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
 * @param {string} path Relative path from project root.
 * @returns {string}
 */
const getHtml = function(path) {
  return fs.readFileSync(__dirname + '/../' + path).toString();
};

/**
 * @typedef {Object} PatternItemDiff
 * @property {string} [url]
 * @property {string} [msg]
 * @property {string} [backgroundColor]
 * @property {string} [fontColor]
 * @property {string} [displayPosition]
 * @property {number} [status]
 */

/**
 * @param {PatternItemDiff} diff
 * @returns {PatternItem}
 */
const makePatternItem = function (diff) {
  /** @type {PatternItem} */
  const base = {
    url: 'domain1.example.com',
    msg: 'domain1',
    backgroundColor: '000000',
    fontColor: 'ffffff',
    displayPosition: 'bottom',
    status: 1,
  };

  return /** @type {PatternItem} */ deepMerge(base, diff);
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

  return /** @type {FoundItem} */ deepMerge(base, diff);
};

module.exports.clearStorage = clearStorage;
module.exports.setUpStorage = setUpStorage;
module.exports.currentVersion = currentVersion;
module.exports.isValidJson = isValidJson;
module.exports.isNotValidJson = isNotValidJson;
module.exports.getHtml = getHtml;
module.exports.makePatternItem = makePatternItem;
module.exports.makeFoundItem = makeFoundItem;

module.exports.uiBase = require('./uiBase');
module.exports.message = require('./message');
module.exports.background = require('./background');
module.exports.popup = require('./popup');
module.exports.content = require('./content');
module.exports.options = require('./options');
