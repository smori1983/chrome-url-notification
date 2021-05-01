const deepMerge = require('deepmerge');

/**
 * @typedef {Object} PatternItemDiff
 * @property {string} [url]
 * @property {string} [msg]
 * @property {string} [backgroundColor]
 * @property {string} [displayPosition]
 * @property {number} [status]
 */

/**
 * @param {PatternItemDiff} diff
 * @returns {PatternItem}
 */
const makePatternItem = (diff) => {
  /** @type {PatternItem} */
  const base = {
    url: 'domain1.example.com',
    msg: 'domain1',
    backgroundColor: '000000',
    displayPosition: 'bottom',
    status: 1,
  };

  return /** @type {PatternItem} */ deepMerge(base, diff);
};

/**
 * @typedef {Object} FoundItemDiff
 * @property {string} [url]
 * @property {string} [message]
 * @property {string} [backgroundColor]
 * @property {string} [fontColor]
 * @property {string} [displayPosition]
 * @property {number} [status]
 */

/**
 * @param {FoundItemDiff} diff
 * @returns {FoundItem}
 */
const makeFoundItem = (diff) => {
  /** @type {FoundItem} */
  const base = {
    url: 'https://example.com/',
    message: 'example',
    backgroundColor: '000000',
    fontColor: 'ffffff',
    displayPosition: 'bottom',
    status: 1,
  };

  return /** @type {FoundItem} */ deepMerge(base, diff);
};

module.exports.makePatternItem = makePatternItem;
module.exports.makeFoundItem = makeFoundItem;
