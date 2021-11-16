const deepMerge = require('deepmerge');

/**
 * @typedef {Object} ChromeTabsTabDiff
 * @property {number} [id]
 * @property {string} [url]
 */

/**
 * @param {ChromeTabsTabDiff} diff
 * @returns {chrome.tabs.Tab}
 */
const createTab = (diff) => {
  const base = {
    index: 0,
    url: 'https://example.com/page1.html',
    pinned: false,
    highlighted: true,
    windowId: 10,
    active: true,
    id: 10001,
    incognito: false,
    selected: true,
    discarded: false,
    autoDiscardable: true,
  };

  return /** @type {chrome.tabs.Tab} */ deepMerge(base, diff);
};

const sendResponse = () => {
  /**
   * @type {Object}
   */
  let data;

  return {
    /**
     * @param {Object} args
     */
    callback: (args) => {
      data = args;
    },
    /**
     * @returns {Object}
     */
    data: () => {
      return data;
    },
  };
};

module.exports.createTab = createTab;
module.exports.sendResposne = sendResponse;
