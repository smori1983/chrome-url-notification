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
 * @returns {boolean}
 */
const shouldMigrate = function() {
  return config.version() > currentVersion();
};

/**
 * Object edit phase using migrationExecutor.
 *
 * @param {PatternItem[]} patterns
 * @param {number} version
 * @returns {PatternItem[]}
 */
const migrate = function(patterns, version) {
  let result = [];

  patterns.forEach(function(pattern) {
    result.push(migrationExecutor.from(version, pattern));
  });

  return result;
};

/**
 * @param {number} currentVersion
 */
const migrateFrom = function(currentVersion) {
  let result = [];

  storage.getAll().forEach(function(item) {
    result.push(migrationExecutor.from(currentVersion, item));
  });

  storage.replace(currentVersion + 1, result);
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.shouldMigrate = shouldMigrate;
module.exports.migrateFrom = migrateFrom;
