const Config = require('./config');
const MigrationExecutor = require('./migration-executor');
const Storage = require('./storage');

class Migration {
  constructor() {
    /**
     * @type {Config}
     * @private
     */
    this._config = new Config();

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

  execute() {
    const version = this.currentVersion();
    const patterns = this._storage.getCollection().get();

    this._persist(this._migrationExecutor.toLatest(patterns, version));
  }

  /**
   * Persistence phase using storage.
   *
   * Assumes that patterns are fully migrated.
   *
   * @param {PatternItem[]} patterns
   * @private
   */
  _persist(patterns) {
    this._storage.replace(this._config.version(), patterns);
  }

  /**
   * @returns {boolean}
   */
  hasVersion() {
    return this._storage.hasVersion();
  }

  /**
   * @returns {number}
   */
  currentVersion() {
    return this._storage.currentVersion();
  }
}

module.exports = Migration;
