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
   * @returns {boolean}
   */
  hasVersion() {
    return this._isValidStringAsVersion(this._getVersion());
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
   * @returns {number}
   */
  getCount() {
    return this.getAll().length;
  }

  /**
   * @returns {PatternItem[]}
   */
  getAll() {
    const data = localStorage.getItem(this._key.pattern);

    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  }

  /**
   * Finds pattern item by exact match of URL pattern.
   *
   * @param {string} url
   * @returns {(PatternItem|null)}
   */
  findByUrl(url) {
    const patterns = this.getAll();

    for (let i = 0, len = patterns.length; i < len; i++) {
      if (patterns[i].url === url) {
        return patterns[i];
      }
    }

    return null;
  }

  /**
   * @param {PatternItem} pattern
   */
  addPattern(pattern) {
    if (this.findByUrl(pattern.url)) {
      return;
    }

    this._savePattern(this.getAll().concat(pattern));
  }

  /**
   * @param {string} originalUrl
   * @param {PatternItem} pattern
   */
  updatePattern(originalUrl, pattern) {
    if (this.findByUrl(originalUrl)) {
      this.deletePattern(originalUrl);
      this.addPattern(pattern);
    }
  }

  /**
   * @param {string} url
   */
  deletePattern(url) {
    const filtered = this.getAll().filter((pattern) => {
      return pattern.url !== url;
    });

    this._savePattern(filtered);
  }

  deleteAll() {
    this._savePattern([]);
  }

  /**
   * @param {number} version
   * @param {PatternItem[]} patterns
   */
  replace(version, patterns) {
    this._saveVersion(version);
    this._savePattern(patterns);
  }

  /**
   * @param {number} version
   * @private
   */
  _saveVersion(version) {
    localStorage.setItem(this._key.version, version.toString());
  }

  /**
   * @param {PatternItem[]} data
   * @private
   */
  _savePattern(data) {
    localStorage.setItem(this._key.pattern, JSON.stringify(data));
  }
}

module.exports = Storage;
