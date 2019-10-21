'use strict';

const fs = require('fs');
const validator = require('../src/js/urlNotification/validator');
const factory = require('./factory');
const storage = require('./storage');

const clearStorage = function() {
  storage.clear();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const setUpStorage = function(version, patterns) {
  storage.setUp(version, patterns);
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
 * @param {PatternItemDiff} diff
 * @returns {PatternItem}
 */
const makePatternItem = function (diff) {
  return factory.makePatternItem(diff);
};

/**
 * @param {FoundItemDiff} diff
 * @returns {FoundItem}
 */
const makeFoundItem = function(diff) {
  return factory.makeFoundItem(diff);
};

module.exports.clearStorage = clearStorage;
module.exports.setUpStorage = setUpStorage;
module.exports.currentVersion = currentVersion;
module.exports.isValidJson = isValidJson;
module.exports.isNotValidJson = isNotValidJson;
module.exports.getHtml = getHtml;
module.exports.makePatternItem = makePatternItem;
module.exports.makeFoundItem = makeFoundItem;

module.exports.chrome = require('./chrome');
module.exports.uiBase = require('./uiBase');
module.exports.message = require('./message');
module.exports.background = require('./background');
module.exports.popup = require('./popup');
module.exports.content = require('./content');
module.exports.options = require('./options');
