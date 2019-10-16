const background = require('../urlNotification/background');

/**
 * @typedef {Object} MessageBrowserActionFind
 * @property {string} command
 * @property {{url: string}} data
 */

/**
 * @param {MessageBrowserActionFind} request
 * @param {chrome.runtime.MessageSender} sender
 * @param {function} sendResponse
 */
const listener = function(request, sender, sendResponse) {
  /* istanbul ignore next */
  if (request.command !== 'browser_action:find') {
    return;
  }

  const findResult = background.find(request.data.url, { ignoreStatus: true });

  sendResponse(findResult);
};

const listen = function () {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
