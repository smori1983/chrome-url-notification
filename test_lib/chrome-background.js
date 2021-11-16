const chrome = require('sinon-chrome');
const {before, beforeEach, afterEach, after} = require('mocha');

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
 * Ensure chrome.browserAction.setBadgeText() called with arguments.
 *
 * @param {string} text
 * @param {number} tabId
 * @returns {boolean}
 */
const setBadgeTextCalledWith = (text, tabId) => {
  return chrome.browserAction.setBadgeText
    .withArgs({
      text: text,
      tabId: tabId,
    })
    .calledOnce;
};

/**
 * chrome.runtime.onMessage() for 'content_scripts:find'
 *
 * @param {string} url
 * @param {number} tabId
 * @param {function} callback
 */
const contentFindDispatch = (url, tabId, callback) => {
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
 * chrome.runtime.onMessage() for 'browser_action:find'
 *
 * @param {string} url
 * @param {function} callback
 */
const popupFindDispatch = (url, callback) => {
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

module.exports.registerHooks = registerHooks;

module.exports.setBadgeTextCalledWith = setBadgeTextCalledWith;
module.exports.contentFindDispatch = contentFindDispatch;
module.exports.popupFindDispatch = popupFindDispatch;
module.exports.popupUpdateStatusDispatch = popupUpdateStatusDispatch;
