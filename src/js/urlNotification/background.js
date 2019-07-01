'use strict';

const config = require('./config');
const finder = require('./finder');
const migration = require('./migration');

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FindResultData|null)} data Depends on the value of matched
 */

/**
 * @typedef {object} FindResultData
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} fontColor
 * @property {string} displayPosition
 */

const migrate = function() {
  while (migration.shouldMigrate()) {
    migration.migrateFrom(migration.currentVersion());
  }
};

/**
 * @param {string} url
 * @return {FindResult}
 */
const find = function(url) {
  let item;
  let result = {};

  if ((item = finder.findFor(url)) !== null) {
    result.matched = true;
    result.data = createData(item);
  } else {
    result.matched = false;
    result.data = null;
  }

  return result;
};

/**
 * @param {PatternItem} item
 * @returns {FindResultData}
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

module.exports.migrate = migrate;
module.exports.find = find;
