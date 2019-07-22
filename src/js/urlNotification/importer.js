'use strict';

const _ = require('lodash');
const migrationExecutor = require('./migrationExecutor');
const storage = require('./storage');

/**
 * Persistence phase using storage.
 *
 * @param {PatternItem[]} patterns
 */
const persist = function(patterns) {
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
  let version = json.version;
  let patterns = json.pattern;

  persist(migrationExecutor.toLatest(patterns, version));
};

module.exports.importJson = importJson;
