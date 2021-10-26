const finder = require('../urlNotification/finder');

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
const listener = (request, sender, sendResponse) => {
  /* istanbul ignore next */
  if (request.command !== 'browser_action:find') {
    return;
  }

  const findResult = finder.findFor(request.data.url, { ignoreStatus: true });

  sendResponse(findResult);
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
