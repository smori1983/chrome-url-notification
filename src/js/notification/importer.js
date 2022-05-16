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
   * @return {Promise<void>}
   */
  async importJson(json) {
    const version = json.version;
    const patterns = json.pattern;

    await this._persist(this._migrationExecutor.toLatest(patterns, version));
  }

  /**
   * Persistence phase using storage.
   *
   * @param {PatternItem[]} patterns
   * @return {Promise<void>}
   * @private
   */
  async _persist(patterns) {
    for (const pattern of patterns) {
      await this._storage.upsertPattern(pattern);
    }
  }
}

module.exports = Importer;
