const MigrationExecutor = require('./migration-executor');
const Storage = require('./storage');

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

    /**
     * @type {Storage}
     * @private
     */
    this._storage = new Storage();
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
      this._storage.upsertPattern(pattern);
    });
  }
}

module.exports = Importer;
