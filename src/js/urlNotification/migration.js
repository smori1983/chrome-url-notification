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
 * @param {number} version
 * @returns {PatternItem[]}
 */
const migrate = function(patterns, version) {
  return migrationExecutor.execute(patterns, version);
};

const execute = function() {
  while (config.version() > currentVersion()) {
    const version = currentVersion();

    const result = migrate(storage.getAll(), version);

    storage.replace(version + 1, result);
  }
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.execute = execute;
