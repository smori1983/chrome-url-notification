const badge = require('./background.badge');
const Storage = require('../notification/storage');

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

  const storage = new Storage();
  const pattern = storage.find(request.data.url);

  // TODO: When pattern was not found.
  if (pattern) {
    pattern.status = request.data.status;

    storage.updatePattern(request.data.url, pattern);
  }

  badge.draw(request.data.tabId, true, request.data.status);

  sendResponse({
    item: pattern,
    status: request.data.status,
  });
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
