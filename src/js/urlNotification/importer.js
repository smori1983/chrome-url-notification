const migrationExecutor = require('./migrationExecutor');
const storage = require('./storage');

/**
 * Persistence phase using storage.
 *
 * @param {PatternItem[]} patterns
 */
const persist = (patterns) => {
  patterns.forEach((pattern) => {
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
 * @param {ImportJson} json
 */
const importJson = (json) => {
  const version = json.version;
  const patterns = json.pattern;

  persist(migrationExecutor.toLatest(patterns, version));
};

module.exports.importJson = importJson;

/**
 * @typedef {object} ImportJson
 * @property {number} version
 * @property {PatternItem[]} pattern
 */
