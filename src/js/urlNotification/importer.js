'use strict';

const _ = require('lodash');
const config = require('./config');
const migrationExecutor = require('./migrationExecutor');
const storage = require('./storage');

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
 * Persistence phase using storage.
 *
 * @param {PatternItem[]} patterns
 */
const addOrUpdate = function(patterns) {
  patterns.forEach(function(pattern) {
    if (storage.findByUrl(pattern.url)) {
      storage.updatePattern(pattern.url, pattern);
    } else {
      storage.addPattern(pattern);
    }
  });
};

/**
 * Assumes that json is validated.
 *
 * @param {object} initialJson
 */
const importJson = function(initialJson) {
  let json = _.cloneDeep(initialJson);

  console.info('Import start.');

  while (config.version() > json.version) {
    console.info('Migrate from scheme version ' + json.version);

    json.pattern = migrate(json.pattern, json.version);
    json.version += 1;
  }

  addOrUpdate(json.pattern);

  console.info('Import done.');
};

module.exports.importJson = importJson;
