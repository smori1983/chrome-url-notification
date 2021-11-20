const Config = require('./config');
const storage = require('./storage');
const deepMerge = require('deepmerge');

/**
 * @typedef {object} FindOption
 * @property {boolean} ignoreStatus
 */

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
  }

  /**
   * Find pattern.
   *
   * Conditions:
   * - PatternItem.status is 1 (if option.ignoreStatus is false)
   * - PatternItem.url matches url
   *
   * @param {string} url
   * @param {FindOption} [option]
   * @returns {FindResult}
   */
  findFor(url, option) {
    let i, len;

    option = deepMerge(this._defaultFindOption(), option || {});

    /** @type {PatternItem[]} */
    const patterns = storage.getAll();

    for (i = 0, len = patterns.length; i < len; i++) {
      if (this._makeRegExp(patterns[i].url).test(url)) {
        if ((option.ignoreStatus === true) || (option.ignoreStatus === false && patterns[i].status === 1)) {
          return {
            matched: true,
            data: this._createData(patterns[i]),
          }
        }
      }
    }

    return {
      matched: false,
      data: null,
    };
  }

  /**
   * @returns {FindOption}
   * @private
   */
  _defaultFindOption() {
    return {
      ignoreStatus: false,
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
