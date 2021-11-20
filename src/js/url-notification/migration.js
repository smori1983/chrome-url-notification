const config = require('./config');
const storage = require('./storage');
const migrationExecutor = require('./migration-executor');

class Migration {
  execute () {
    const version = this.currentVersion();
    const patterns = storage.getAll();

    this._persist(migrationExecutor.toLatest(patterns, version));
  }

  /**
   * Persistence phase using storage.
   *
   * Assumes that patterns are fully migrated.
   *
   * @param {PatternItem[]} patterns
   * @private
   */
  _persist (patterns) {
    storage.replace(config.version(), patterns);
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
