const badge = require('./background.badge');
const finder = require('../url-notification/finder');

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

  const findResult = finder.findFor(request.data.url, { ignoreStatus: true });
  const status = findResult.matched ? findResult.data.status : null;

  badge.draw(sender.tab.id, findResult.matched, status);

  sendResponse(findResult);
};

const listen = () => {
  chrome.runtime.onMessage.addListener(listener);
};

module.exports.listen = listen;
