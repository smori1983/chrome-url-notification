const deepMerge = require('deepmerge');
const Config = require('./config');
const Storage = require('./storage');
const Validator = require('./validator');

class Data {
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

    /**
     * @type {Validator}
     * @private
     */
    this._validator = new Validator();
  }

  /**
   * @param {string} url
   * @param {object} data contains part of pattern item
   * @returns {boolean} true if successfully updated
   */
  updatePattern(url, data) {
    const item = this._storage.findByUrl(url);

    if (item === null) {
      return false;
    }

    const merged = deepMerge(item, data);

    const dataForValidation = {
      version: this._config.version(),
      pattern: [merged],
    };

    if (this._validator.forImportJson(dataForValidation) === false) {
      return false;
    }

    this._storage.updatePattern(url, merged);

    return true;
  }

  /**
   * @param {PatternItem[]} patterns
   * @returns {PatternItem[]}
   */
  sortByUrl(patterns) {
    return patterns.sort((a, b) => {
      return (a.url < b.url) ? -1 : 1;
    });
  }

  /**
   * @param {PatternItem[]} patterns
   * @returns {PatternItem[]}
   */
  sortByMessage(patterns) {
    return patterns.sort((a, b) => {
      if (a.msg === b.msg) {
        return (a.url < b.url) ? -1 : 1;
      }

      return (a.msg < b.msg) ? -1 : 1;
    });
  }
}

module.exports = Data;
