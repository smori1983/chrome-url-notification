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

module.exports.setBadgeTextCalledWith = setBadgeTextCalledWith;
