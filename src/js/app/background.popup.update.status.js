const badge = require('./background.badge');
const data = require('../urlNotification/data');
const storage = require('../urlNotification/storage');

/**
 * @typedef {Object} MessageBrowserActionUpdateStatus
 * @property {string} command
 * @property {{url: string, status: number, tabId: number}} data
 */

/**
 * @typedef {Object} MessageBrowserActionUpdateStatusResponse
 * @property {PatternItem} item
 * @property {number} status
 */

/**
 * @param {MessageBrowserActionUpdateStatus} request
 * @param {chrome.runtime.MessageSender} sender
 * @param {function} sendResponse
 */
const listener = (request, sender, sendResponse) => {
  /* istanbul ignore next */
  if (request.command !== 'browser_action:update:status') {
    return;
  }

  // TODO: Check return value.
  data.updatePattern(request.data.url, { status: request.data.status });

  badge.draw(request.data.tabId, true, request.data.status);

  const item = storage.findByUrl(request.data.url);

  sendResponse({
    item: item,
    status: request.data.status,
  });
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
