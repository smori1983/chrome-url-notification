'use strict';

const config = require('./config');
const finder = require('./finder');
const migration = require('./migration');
const storage = require('./storage');
const validator = require('./validator');
const deepMerge = require('deepmerge');

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FoundItem|null)} data Depends on the value of matched
 */

const migrate = function() {
  migration.execute();
};

/**
 * @param {string} url
 * @param {FindOption} [option]
 * @return {FindResult}
 */
const find = function(url, option) {
  const item = finder.findFor(url, option);

  return {
    matched: item !== null,
    data: item,
  };
};

/**
 * @param {string} url
 * @returns {PatternItem}
 */
const findByUrl = function(url) {
  return storage.findByUrl(url);
};

/**
 * @param {string} url
 * @param {object} data
 * @returns {boolean} true if successfully updated
 */
const updatePattern = function(url, data) {
  const item = storage.findByUrl(url);

  if (item === null) {
    return false;
  }

  const merged = deepMerge(item, data);

  const dataForValidation = {
    version: config.version(),
    pattern: [merged],
  };

  if (validator.forImportJson(dataForValidation) === false) {
    return false;
  }

  storage.updatePattern(url, merged);

  return true;
};

module.exports.migrate = migrate;
module.exports.find = find;
module.exports.findByUrl = findByUrl;
module.exports.updatePattern = updatePattern;
