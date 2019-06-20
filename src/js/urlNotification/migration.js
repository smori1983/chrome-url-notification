'use strict';

const config = require('./config');
const storage = require('./storage');
const migrationExecuter = require('./migrationExecuter');

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
  return currentVersion() < config.version();
};

/**
 * @param {number} currentVersion
 */
const migrateFrom = function(currentVersion) {
  let result = [];

  storage.getAll().forEach(function(item) {
    result.push(migrationExecuter.from(currentVersion, item));
  });

  storage.replace(currentVersion + 1, result);
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.shouldMigrate = shouldMigrate;
module.exports.migrateFrom = migrateFrom;
