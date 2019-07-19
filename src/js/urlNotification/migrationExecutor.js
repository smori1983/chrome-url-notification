'use strict';

const config = require('./config');

/**
 * Migration from 0 to 1
 *
 * - Set default background color with no condition.
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for0 = function(item) {
  item.backgroundColor = config.defaultBackgroundColor();

  return item;
};

/**
 * Migration from 1 to 2
 *
 * - Set default display position with no condition.
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for1 = function(item) {
  item.displayPosition = config.defaultDisplayPosition();

  return item;
};

/**
 * Migration from 2 to 3
 *
 * - Set default status with no condition.
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for2 = function(item) {
  item.status = config.defaultStatus();

  return item;
};

const converters = {
  0: for0,
  1: for1,
  2: for2,
};

/**
 * @param {number} fromVersion
 * @param {PatternItem} pattern
 * @returns {PatternItem}
 */
const executeFrom = function(fromVersion, pattern) {
  return converters[fromVersion](pattern);
};

/**
 * Execute migration for passed patterns.
 *
 * @param {PatternItem[]} patterns
 * @param {number} fromVersion
 * @returns {PatternItem[]}
 */
const execute = function(patterns, fromVersion) {
  let result = [];

  patterns.forEach(function(pattern) {
    result.push(executeFrom(fromVersion, pattern));
  });

  return result;
};

module.exports.from = executeFrom;
module.exports.execute = execute;
