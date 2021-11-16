const { before, beforeEach, afterEach, after } = require('mocha');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const file = require('./file');

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
  const path = 'src/_locales/' + locale + '/messages.json';
  const message = file.read(path);
  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
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
module.exports.i18n = i18n;

module.exports.setBadgeTextCalledWith = setBadgeTextCalledWith;
module.exports.contentFindDispatch = contentFindDispatch;
module.exports.popupFindDispatch = popupFindDispatch;
module.exports.popupUpdateStatusDispatch = popupUpdateStatusDispatch;
