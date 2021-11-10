class Storage {
  /**
   * @param {Storage} localStorage
   */
  constructor(localStorage) {
    /**
     * @private
     */
    this._localStorage = localStorage;

    this._key = {
      version: 'version',
      pattern: 'pattern',
    };
  }

  /**
   * Set up localStorage.
   *
   * @param {string} version
   * @param {PatternItem[]} patterns
   */
  init(version, patterns) {
    this.clear();
    this._localStorage.setItem('version', version);
    this._localStorage.setItem('pattern', JSON.stringify(patterns));
  }

  clear() {
    this._localStorage.clear();
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
    const data = this._localStorage.getItem(this._key.pattern);

    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  }
}

module.exports = Storage;
