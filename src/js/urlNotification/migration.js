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
 * Object edit phase using migrationExecutor.
 *
 * @param {PatternItem[]} patterns
 * @param {number} fromVersion
 * @returns {PatternItem[]}
 */
const migrate = function(patterns, fromVersion) {
  let version = fromVersion;

  for (; version < config.version(); version++) {
    patterns = migrationExecutor.execute(patterns, version);
  }

  return patterns;
};

/**
 * Persistence phase using storage.
 *
 * @param {number} version
 * @param {PatternItem[]} patterns
 */
const persist = function(version, patterns) {
  storage.replace(version, patterns);
};

const execute = function() {
  let version = currentVersion();
  let patterns = storage.getAll();

  patterns = migrate(patterns, version);

  persist(config.version(), patterns);
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.execute = execute;
