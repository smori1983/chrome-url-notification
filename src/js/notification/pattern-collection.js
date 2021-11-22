class PatternCollection {
  /**
   * @param {PatternItem[]} patterns
   */
  constructor(patterns) {
    /**
     * @type {PatternItem[]}
     * @private
     */
    this._patterns = patterns;
  }

  /**
   * @returns {PatternItem[]}
   */
  get() {
    return this._patterns;
  }

  /**
   * @returns {PatternCollection}
   */
  sortByUrl() {
    const sorted = this._patterns.sort((a, b) => {
      return (a.url < b.url) ? -1 : 1;
    });

    return new PatternCollection(sorted);
  }

  /**
   * @returns {PatternCollection}
   */
  sortByMessage() {
    const sorted = this._patterns.sort((a, b) => {
      if (a.msg === b.msg) {
        return (a.url < b.url) ? -1 : 1;
      }

      return (a.msg < b.msg) ? -1 : 1;
    });

    return new PatternCollection(sorted);
  }
}

module.exports = PatternCollection;
