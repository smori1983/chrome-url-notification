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

  /**
   * @return {Promise<void>}
   */
  async execute() {
    const version = await this.currentVersion();
    const collection = await this._storage.getCollection();
    const patterns = collection.get();

    await this._persist(this._migrationExecutor.toLatest(patterns, version));
  }

  /**
   * Persistence phase using storage.
   *
   * Assumes that patterns are fully migrated.
   *
   * @param {PatternItem[]} patterns
   * @return {Promise<void>}
   * @private
   */
  async _persist(patterns) {
    await this._storage.replace(this._config.version(), patterns);
  }

  /**
   * @return {Promise<boolean>}
   */
  async hasVersion() {
    return await this._storage.hasVersion();
  }

  /**
   * @return {Promise<number>}
   */
  async currentVersion() {
    return await this._storage.currentVersion();
  }
}

module.exports = Migration;
