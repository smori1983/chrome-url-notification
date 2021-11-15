const chrome = require('sinon-chrome');

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

module.exports.setBadgeTextCalledWith = setBadgeTextCalledWith;
module.exports.contentFindDispatch = contentFindDispatch;
module.exports.popupFindDispatch = popupFindDispatch;
