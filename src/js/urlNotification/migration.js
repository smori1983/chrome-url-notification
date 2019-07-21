'use strict';

const config = require('./config');
const storage = require('./storage');
const migrationExecutor = require('./migrationExecutor');

/**
 * @returns {boolean}
 */
const hasVersion = function() {
  return storage.hasVersion();
};

/**
 * @returns {number}
 */
const currentVersion = function() {
  return storage.currentVersion();
};

/**
 * Persistence phase using storage.
 *
 * Assumes that patterns are fully migrated.
 *
 * @param {PatternItem[]} patterns
 */
const persist = function(patterns) {
  storage.replace(config.version(), patterns);
};

const execute = function() {
  let version = currentVersion();
  let patterns = storage.getAll();

  persist(migrationExecutor.toLatest(patterns, version));
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.execute = execute;
