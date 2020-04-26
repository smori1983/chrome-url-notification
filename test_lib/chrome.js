const chrome = require('sinon-chrome');
const deepMerge = require('deepmerge');
const factory = require('./factory');

/**
 * @typedef {Object} ChromeTabsTabDiff
 * @property {number} [id]
 * @property {string} [url]
 */

/**
 * @param {ChromeTabsTabDiff} diff
 * @returns {chrome.tabs.Tab}
 */
const createTab = function(diff) {
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

/**
 * @param {string} url
 * @returns {boolean}
 */
const tabsCreateShould = function (url) {
  return chrome.tabs.create
    .withArgs({
      url: url,
    })
    .calledOnce;
};

/**
 * chrome.browserAction.setBadgeText()
 *
 * @param {string} text
 * @param {number} tabId
 * @returns {boolean}
 */
const setBadgeTextShould = function(text, tabId) {
  return chrome.browserAction.setBadgeText
    .withArgs({
      text: text,
      tabId: tabId,
    })
    .calledOnce;
};

const sendResponse = function() {
  /**
   * @type {Object}
   */
  let data;

  return {
    /**
     * @param {Object} args
     */
    callback: function(args) {
      data = args;
    },
    /**
     * @returns {Object}
     */
    data: function() {
      return data;
    },
  };
};

/**
 * @param {string} url
 * @param {(FoundItem|null)} item
 */
const contentFindChain = function(url, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'content_scripts:find',
      data: {
        url: url,
      },
    })
    .callArgWith(1, {
      matched: item !== null,
      data: item,
    })
};

/**
 * chrome.runtime.onMessage() for 'content_scripts:find'
 *
 * @param {string} url
 * @param {number} tabId
 * @param {function} callback
 */
const contentFindDispatch = function (url, tabId, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'content_scripts:find',
        data: {
          url: url,
        },
      },
      {
        tab: {
          id: tabId,
        },
      },
      callback
    );
};

/**
 * chrome.runtime.onMessage() for 'content:tab:notify:status'
 *
 * @param {string} displayPosition
 * @param {number} status
 */
const contentTabNotifyStatusDispatch = function(displayPosition, status) {
  chrome.runtime.onMessage
    .dispatch({
      command: 'tab:notify:status',
      data: {
        item: factory.makeFoundItem({
          displayPosition: displayPosition,
          status: status,
        }),
      },
    });
};

/**
 * @param {chrome.tabs.Tab} tab
 * @param {(FoundItem|null)} item
 */
const popupFindChain = function(tab, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:find',
      data: {
        url: tab.url,
      },
    })
    .callArgWith(1, {
      matched: item !== null,
      data: item,
    });
};

/**
 * chrome.runtime.onMessage() for 'browser_action:find'
 *
 * @param {string} url
 * @param {function} callback
 */
const popupFindDispatch = function (url, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'browser_action:find',
        data: {
          url: url,
        },
      },
      {},
      callback
    );
};

/**
 * @param {number} tabId
 * @param {FindResult} item
 * @param {number} status
 * @returns {boolean}
 */
const popupTabNotifyStatusShould = function (tabId, item, status) {
  return chrome.tabs.sendMessage
    .withArgs(tabId, {
      command: 'tab:notify:status',
      data: {
        item: item,
        status: status,
      },
    })
    .calledOnce;
};

/**
 * @param {string} url used to part of chrome.tabs.Tab
 */
const popupTabsQueryChain = function (url) {
  chrome.tabs.query
    .withArgs({
      currentWindow: true,
      active: true,
    })
    .callArgWith(1, [{
      url: url,
    }]);
};

/**
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @param {FindResult} item
 */
const popupUpdateStatusChain = function(tabId, url, status, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:update:status',
      data: {
        url: url,
        status: status,
        tabId: tabId,
      },
    })
    .callsArgWith(1, {
      item: item,
      status: status,
    });
};

/**
 * chrome.runtime.onMessage() for 'browser_action:update:status'
 *
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @param {function} callback
 */
const popupUpdateStatusDispatch = function (tabId, url, status, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'browser_action:update:status',
        data: {
          url: url,
          status: status,
          tabId: tabId,
        },
      },
      {},
      callback
    );
};

/**
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @returns {boolean}
 */
const popupUpdateStatusShould = function(tabId, url, status) {
  return chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:update:status',
      data: {
        url: url,
        status: status,
        tabId: tabId,
      },
    })
    .calledOnce;
};

module.exports.createTab = createTab;
module.exports.tabsCreateShould = tabsCreateShould;
module.exports.setBadgeTextShould = setBadgeTextShould;
module.exports.sendResposne = sendResponse;

module.exports.contentFindChain = contentFindChain;
module.exports.contentFindDispatch = contentFindDispatch;
module.exports.contentTabNotifyStatusDispatch = contentTabNotifyStatusDispatch;
module.exports.popupFindChain = popupFindChain;
module.exports.popupFindDispatch = popupFindDispatch;
module.exports.popupTabNotifyStatusShould = popupTabNotifyStatusShould;
module.exports.popupTabsQueryChain = popupTabsQueryChain;
module.exports.popupUpdateStatusChain = popupUpdateStatusChain;
module.exports.popupUpdateStatusDispatch = popupUpdateStatusDispatch;
module.exports.popupUpdateStatusShould = popupUpdateStatusShould;