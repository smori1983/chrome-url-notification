'use strict';

const finder = require('./finder');
const migration = require('./migration');

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FindResultData|null)} data Depends on the value of matched
 */

/**
 * @typedef {object} FindResultData
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
 * @param {string} pattern
 * @return {FindResult}
 */
const find = function(pattern) {
  let item;
  let result = {};

  if ((item = finder.findFor(pattern)) !== null) {
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
    message: item.msg,
    backgroundColor: item.backgroundColor,
    fontColor: 'ffffff',
    displayPosition: item.displayPosition,
  };
};

module.exports.migrate = migrate;
module.exports.find = find;
