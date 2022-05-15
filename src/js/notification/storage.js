const PatternCollection = require('./pattern-collection');

/**
 * @typedef {object} PatternItem
 * @property {string} url Added schema version: 0
 * @property {string} msg Added schema version: 0
 * @property {string} [backgroundColor] Added schema version: 1
 * @property {string} [displayPosition] Added schema version: 2
 * @property {number} [status] Added schema version: 3
 */

class Storage {
  constructor() {
    /**
     * @private
     */
    this._key = {
      version: 'version',
      pattern: 'pattern',
    };
  }

  /**
   * @return {Promise<boolean>}
   */
  async hasVersion() {
    const version = await this._getVersion();

    return this._isValidStringAsVersion(version);
  }

  /**
   * Gets the version stored in storage.
   *
   * @return {Promise<number>}
   */
  async currentVersion() {
    const version = await this._getVersion();

    if (this._isValidStringAsVersion(version)) {
      return parseInt(version, 10);
    }

    return 0;
  }

  /**
   * @return {Promise<string>}
   * @private
   */
  async _getVersion() {
    const result = await chrome.storage.local.get(this._key.version);

    if (!result[this._key.version]) {
      return null;
    }

    return result[this._key.version];
  }

  /**
   * @param {*} value
   * @return {boolean}
   * @private
   */
  _isValidStringAsVersion(value) {
    return (typeof value === 'string') && (/^\d+$/.test(value));
  }

  /**
   * @return {PatternItem[]}
   * @return {Promise<PatternItem[]>}
   * @private
   */
  async _getAll() {
    const result = await chrome.storage.local.get(this._key.pattern);

    if (!result[this._key.pattern]) {
      return [];
    }

    return JSON.parse(result[this._key.pattern]);
  }

  /**
   * @return {Promise<Object>}
   */
  async dump() {
    const result = {};

    const version = await this.currentVersion();
    const collection = await this.getCollection();

    result[this._key.version] = version;
    result[this._key.pattern] = collection.sortByMessage().get();

    return result;
  }

  /**
   *
   * @return {Promise<PatternCollection>}
   */
  async getCollection() {
    const patterns = await this._getAll();

    return new PatternCollection(patterns);
  }

  /**
   * Finds pattern item by exact match of URL pattern.
   *
   * @param {string} url
   * @return {Promise<PatternItem|null>}
   */
  async find(url) {
    const patterns = await this._getAll();

    for (let i = 0, len = patterns.length; i < len; i++) {
      if (patterns[i].url === url) {
        return patterns[i];
      }
    }

    return null;
  }

  /**
   * @param {PatternItem} pattern
   * @return {Promise<void>}
   */
  async addPattern(pattern) {
    if (await this.find(pattern.url)) {
      return;
    }

    const allData = await this._getAll();

    await this._savePattern(allData.concat(pattern));
  }

  /**
   * To invoke storage change event once, do not call deletePattern() and addPattern().
   *
   * @param {string} originalUrl
   * @param {PatternItem} pattern
   * @return {Promise<void>}
   */
  async updatePattern(originalUrl, pattern) {
    if (await this.find(originalUrl)) {
      const allData = await this._getAll();
      const filtered = allData.filter((pattern) => {
        return pattern.url !== originalUrl;
      });
      const newData = filtered.concat(pattern);

      await this._savePattern(newData);
    }
  }

  /**
   * @param {PatternItem} pattern
   * @return {Promise<void>}
   */
  async upsertPattern(pattern) {
    if (await this.find(pattern.url)) {
      await this.updatePattern(pattern.url, pattern);
    } else {
      await this.addPattern(pattern);
    }
  }

  /**
   * @param {string} url
   * @return {Promise<void>}
   */
  async deletePattern(url) {
    const allData = await this._getAll();
    const filtered = allData.filter((pattern) => {
      return pattern.url !== url;
    });

    await this._savePattern(filtered);
  }

  /**
   * @return {Promise<void>}
   */
  async deleteAll() {
    await this._savePattern([]);
  }

  /**
   * @param {number} version
   * @param {PatternItem[]} patterns
   * @return {Promise<void>}
   */
  async replace(version, patterns) {
    await this._saveVersion(version);
    await this._savePattern(patterns);
  }

  /**
   * @param {number} version
   * @return {Promise<void>}
   * @private
   */
  async _saveVersion(version) {
    const saveData = {};

    saveData[this._key.version] = version.toString();

    await chrome.storage.local.set(saveData);
  }

  /**
   * @param {PatternItem[]} data
   * @return {Promise<void>}
   * @private
   */
  async _savePattern(data) {
    const saveData = {};

    saveData[this._key.pattern] = JSON.stringify(data);

    await chrome.storage.local.set(saveData);
  }
}

module.exports = Storage;
