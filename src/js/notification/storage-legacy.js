const PatternCollection = require('./pattern-collection');

/**
 * @typedef {object} PatternItem
 * @property {string} url Added schema version: 0
 * @property {string} msg Added schema version: 0
 * @property {string} [backgroundColor] Added schema version: 1
 * @property {string} [displayPosition] Added schema version: 2
 * @property {number} [status] Added schema version: 3
 */

class StorageLegacy {
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
   * Gets the version stored in storage.
   *
   * @returns {number}
   */
  currentVersion() {
    const version = this._getVersion();

    if (this._isValidStringAsVersion(version)) {
      return parseInt(version, 10);
    }

    return 0;
  }

  /**
   * @private
   */
  _getVersion() {
    return localStorage.getItem(this._key.version);
  }

  /**
   * @param {*} value
   * @returns {boolean}
   * @private
   */
  _isValidStringAsVersion(value) {
    return (typeof value === 'string') && (/^\d+$/.test(value));
  }

  /**
   * @returns {PatternItem[]}
   * @private
   */
  _getAll() {
    const data = localStorage.getItem(this._key.pattern);

    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  }

  dump() {
    const result = {};

    result[this._key.version] = this.currentVersion();
    result[this._key.pattern] = this.getCollection().sortByMessage().get();

    return result;
  }

  /**
   * @returns {PatternCollection}
   */
  getCollection() {
    return new PatternCollection(this._getAll());
  }
}

module.exports = StorageLegacy;
