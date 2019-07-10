'use strict';

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

module.exports.setUpStorage = setUpStorage;
