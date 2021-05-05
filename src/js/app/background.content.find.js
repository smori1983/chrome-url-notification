const background = require('../urlNotification/background');
const badge = require('./background.badge');

/**
 * @typedef {Object} MessageContentScriptsFind
 * @property {string} command
 * @property {{url: string}} data
 */

/**
 * @param {MessageContentScriptsFind} request
 * @param {chrome.runtime.MessageSender} sender
 * @param {function} sendResponse
 */
const listener = (request, sender, sendResponse) => {
  /* istanbul ignore next */
  if (request.command !== 'content_scripts:find') {
    return;
  }

  const result = background.find(request.data.url, { ignoreStatus: true });
  const status = result.matched ? result.data.status : null;

  badge.draw(sender.tab.id, result.matched, status);

  sendResponse(result);
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
