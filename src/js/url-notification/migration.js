const Config = require('./config');
const storage = require('./storage');
const MigrationExecutor = require('./migration-executor');

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
  }

  execute() {
    const version = this.currentVersion();
    const patterns = storage.getAll();

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
    storage.replace(this._config.version(), patterns);
  }

  /**
   * @returns {boolean}
   */
  hasVersion() {
    return storage.hasVersion();
  }

  /**
   * @returns {number}
   */
  currentVersion() {
    return storage.currentVersion();
  }
}

module.exports = Migration;
