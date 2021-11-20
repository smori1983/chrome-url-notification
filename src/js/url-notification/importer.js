const MigrationExecutor = require('./migration-executor');
const storage = require('./storage');

/**
 * @typedef {object} ImportJson
 * @property {number} version
 * @property {PatternItem[]} pattern
 */

class Importer {
  constructor() {
    /**
     * @type {MigrationExecutor}
     * @private
     */
    this._migrationExecutor = new MigrationExecutor();
  }

  /**
   * Assumes that json is validated.
   *
   * @param {ImportJson} json
   */
  importJson(json) {
    const version = json.version;
    const patterns = json.pattern;

    this._persist(this._migrationExecutor.toLatest(patterns, version));
  }

  /**
   * Persistence phase using storage.
   *
   * @param {PatternItem[]} patterns
   * @private
   */
  _persist(patterns) {
    patterns.forEach((pattern) => {
      if (storage.findByUrl(pattern.url)) {
        storage.updatePattern(pattern.url, pattern);
      } else {
        storage.addPattern(pattern);
      }
    });
  }
}

module.exports = Importer;
