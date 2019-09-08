/**
 * @typedef {Object} BackgroundRequest
 * @property {string} command
 * @property {object} data
 */

(function() {

  const background = require('../urlNotification/background');
  const badge = require('./badge');

  const onInstalledListener = function() {
    background.migrate();
  };

  /**
   * @param {BackgroundRequest} request
   * @param {chrome.runtime.MessageSender} sender
   * @param {function} sendResponse
   */
  const onMessageListener = function(request, sender, sendResponse) {
    if (request.command === 'content_scripts:find') {
      const result = background.find(request.data.url, { ignoreStatus: true });
      const status = result.matched ? result.data.status : null;

      badge.draw(sender.tab.id, result.matched, status);

      sendResponse(result);
    }

    if (request.command === 'browser_action:find') {
      sendResponse(background.find(request.data.url, { ignoreStatus: true }));
    }

    if (request.command === 'browser_action:update:status') {
      background.updatePattern(request.data.url, { status: request.data.status });

      badge.draw(request.data.tabId, true, request.data.status);

      sendResponse({
        status: request.data.status,
      });
    }
  };

  chrome.runtime.onInstalled.addListener(onInstalledListener);
  chrome.runtime.onMessage.addListener(onMessageListener);

})();
