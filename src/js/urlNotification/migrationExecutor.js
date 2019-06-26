'use strict';

const config = require('./config');

/**
 * Migration from 0 to 1
 *
 * - Set default background color
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for0 = function(item) {
  if (typeof item.backgroundColor === 'undefined') {
    item.backgroundColor = config.defaultBackgroundColor();
  }

  return item;
};

/**
 * Migration from 1 to 2
 *
 * - Set default display position
 *
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const for1 = function(item) {
  if (typeof item.displayPosition === 'undefined') {
    item.displayPosition = config.defaultDisplayPosition();
  }

  return item;
};

const converters = {
  0: for0,
  1: for1,
};

/**
 * @param {number} fromVersion
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const execute = function(fromVersion, item) {
  if (converters.hasOwnProperty(fromVersion)) {
    return converters[fromVersion](item);
  }

  return item;
};

module.exports.from = execute;