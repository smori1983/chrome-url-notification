const Config = require('./config');
const Storage = require('./storage');

/**
 * @typedef {object} FoundItem
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} fontColor
 * @property {string} displayPosition
 * @property {number} status
 */

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FoundItem|null)} data Depends on the value of matched
 */

class Finder {
  constructor() {
    /**
     * @type {Config}
     * @private
     */
    this._config = new Config();

    /**
     * @type {Storage}
     * @private
     */
    this._storage = new Storage();
  }

  /**
   * Find pattern.
   *
   * Conditions:
   * - PatternItem.url matches url
   *
   * @param {string} url
   * @return {Promise<FindResult>}
   */
  async findFor(url) {
    const collection = await this._storage.getCollection();

    /** @type {PatternItem[]} */
    const patterns = collection.get();

    for (let i = 0, len = patterns.length; i < len; i++) {
      if (this._makeRegExp(patterns[i].url).test(url)) {
        return {
          matched: true,
          data: this._createData(patterns[i]),
        }
      }
    }

    return {
      matched: false,
      data: null,
    };
  }

  /**
   * @param {string} url
   * @returns {RegExp}
   * @private
   */
  _makeRegExp(url) {
    return new RegExp(this._convertForMatching(url));
  }

  /**
   * @param {string} url
   * @returns {string}
   * @private
   */
  _convertForMatching(url) {
    return url
      .replace(/[/.+\-?]/g, (matched) => {
        return '\\' + matched;
      })
      .replace(/\*/g, () => {
        return '[0-9a-zA-Z-_]+';
      });
  }

  /**
   * @param {PatternItem} item
   * @returns {FoundItem}
   * @private
   */
  _createData(item) {
    return {
      url: item.url,
      message: item.msg,
      backgroundColor: item.backgroundColor,
      fontColor: this._config.defaultFontColor(),
      displayPosition: item.displayPosition,
      status: item.status,
    };
  }
}

module.exports = Finder;
