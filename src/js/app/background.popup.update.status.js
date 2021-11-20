const badge = require('./background.badge');
const Data = require('../url-notification/data');
const Storage = require('../url-notification/storage');

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

  const data = new Data();
  const storage = new Storage();

  // TODO: Check return value.
  data.updatePattern(request.data.url, { status: request.data.status });

  badge.draw(request.data.tabId, true, request.data.status);

  sendResponse({
    item: storage.findByUrl(request.data.url),
    status: request.data.status,
  });
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
