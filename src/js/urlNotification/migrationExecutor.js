'use strict';

const _ = require('lodash');
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

/**
 * Migration from 3 to 4
 *
 * - No need to set default value.
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for3 = function(item) {
  return item;
};

const converters = {
  0: for0,
  1: for1,
  2: for2,
  3: for3,
};

/**
 * @param {PatternItem} pattern
 * @param {number} fromVersion
 * @returns {PatternItem}
 */
const executeOne = function(pattern, fromVersion) {
  return converters[fromVersion](pattern);
};

/**
 * Execute migration of next 1 generation for passed patterns.
 *
 * @param {PatternItem[]} patterns
 * @param {number} fromVersion
 * @returns {PatternItem[]}
 */
const execute = function(patterns, fromVersion) {
  let result = [];

  patterns.forEach(function(pattern) {
    result.push(executeOne(pattern, fromVersion));
  });

  return result;
};

/**
 * Migrate passed patterns to the latest generation.
 *
 * @param {PatternItem[]} patterns
 * @param {number} fromVersion
 * @returns {PatternItem[]}
 */
const toLatest = function(patterns, fromVersion) {
  let version;
  let migrated = _.cloneDeep(patterns);

  for (version = fromVersion; version < config.version(); version++) {
    migrated = execute(migrated, version);
  }

  return migrated;
};

module.exports.toLatest = toLatest;
