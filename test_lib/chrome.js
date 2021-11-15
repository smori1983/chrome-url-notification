const { before, beforeEach, afterEach, after } = require('mocha');
const chrome = require('sinon-chrome');
const fs = require('fs');
const deepMerge = require('deepmerge');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
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

/**
 * Ensure chrome.tabs.create() called with argument.
 *
 * @param {SinonChrome} chrome
 * @param {string} url
 * @returns {boolean}
 */
const tabsCreateCalledWith = (chrome, url) => {
  /** @type {SinonChrome.tabs} */
  const tabs = chrome.tabs;

  return tabs.create
    .withArgs({
      url: url,
    })
    .calledOnce;
};

const createReqAndRes = (run) => {
  return {
    req: (req) => {
      return {
        res: (res) => {
          run(req, res);
        },
      };
    },
  };
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

/**
 * @param {SinonChrome} chrome
 */
const contentFindMessage = (chrome) => {
  /** @type {SinonChrome.runtime} */
  const runtime = chrome.runtime;

  return createReqAndRes((req, res) => {
    runtime.sendMessage
      .withArgs({
        command: 'content_scripts:find',
        data: {
          url: req.url,
        },
      })
      .callArgWith(1, {
        matched: res.item !== null,
        data: res.item,
      });
  });
};

/**
 * chrome.runtime.onMessage() for 'content:tab:notify:status'
 *
 * @param {SinonChrome} chrome
 * @param {string} displayPosition
 * @param {number} status
 */
const contentTabNotifyStatusDispatch = (chrome, displayPosition, status) => {
  /** @type {SinonChrome.runtime} */
  const runtime = chrome.runtime;

  runtime.onMessage
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
 * @param {SinonChrome} chrome
 */
const popupFindMessage = (chrome) => {
  /** @type {SinonChrome.runtime} */
  const runtime = chrome.runtime;

  return createReqAndRes((req, res) => {
    runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: req.tab.url,
        },
      })
      .callArgWith(1, {
        matched: res.item !== null,
        data: res.item,
      });
  });
};

/**
 * Ensure chrome.tabs.sendMessage() for 'tab:notify:status' command called with arguments.
 *
 * @param {number} tabId
 * @param {FindResult} item
 * @param {number} status
 * @returns {boolean}
 */
const popupTabNotifyStatusCalledWith = (tabId, item, status) => {
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
 * @param {SinonChrome} chrome
 */
const popupTabsQuery = (chrome) => {
  /** @type {SinonChrome.tabs} */
  const tabs = chrome.tabs;

  return createReqAndRes((req, res) => {
    tabs.query
      .withArgs({
        currentWindow: true,
        active: true,
      })
      .callArgWith(1, [{
        id: res.id,
        url: res.url,
      }]);
  });
};

const popupUpdateStatus = () => {
  return createReqAndRes((req, res) => {
    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:update:status',
        data: {
          url: req.url,
          status: req.status,
          tabId: req.tabId,
        },
      })
      .callsArgWith(1, {
        item: res.item,
        status: req.status,
      });
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
const popupUpdateStatusDispatch = (tabId, url, status, callback) => {
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
 * Ensure chrome.runtime.sendMessage() for 'browser_action:update:status' command called with arguments.
 *
 * @param {SinonChrome} chrome
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @returns {boolean}
 */
const popupUpdateStatusCalledWith = (chrome, tabId, url, status) => {
  /** @type {SinonChrome.runtime} */
  const runtime = chrome.runtime;

  return runtime.sendMessage
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

const registerHooks = () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    chrome.flush();

    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });
  });

  afterEach(() => {
  });

  after(() => {
    delete global.chrome;
  });
};

/**
 * @param {string} locale 'en' or 'ja'
 */
const i18n = (locale) => {
  const localeFile = __dirname + '/../src/_locales/' + locale + '/messages.json';
  const message = fs.readFileSync(localeFile).toString();
  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
};

module.exports.createTab = createTab;
module.exports.tabsCreateCalledWith = tabsCreateCalledWith;
module.exports.sendResposne = sendResponse;

module.exports.contentFindMessage = contentFindMessage;
module.exports.contentTabNotifyStatusDispatch = contentTabNotifyStatusDispatch;
module.exports.popupFindMessage = popupFindMessage;
module.exports.popupTabNotifyStatusCalledWith = popupTabNotifyStatusCalledWith;
module.exports.popupTabsQuery = popupTabsQuery;
module.exports.popupUpdateStatus = popupUpdateStatus;
module.exports.popupUpdateStatusDispatch = popupUpdateStatusDispatch;
module.exports.popupUpdateStatusCalledWith = popupUpdateStatusCalledWith;

module.exports.registerHooks = registerHooks;
module.exports.i18n = i18n;
