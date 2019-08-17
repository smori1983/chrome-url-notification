/**
 * @typedef {Object} BackgroundRequest
 * @property {string} command
 * @property {object} data
 */

(function() {

  const background = require('url-notification').background;

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
      sendResponse(background.find(request.data.url, { ignoreStatus: false }));
    }

    if (request.command === 'browser_action:find') {
      sendResponse(background.find(request.data.url, { ignoreStatus: true }));
    }

    if (request.command === 'browser_action:update:status') {
      background.updatePattern(request.data.url, { status: request.data.status });
      sendResponse({
        status: request.data.status,
      });
    }
  };

  chrome.runtime.onInstalled.addListener(onInstalledListener);
  chrome.runtime.onMessage.addListener(onMessageListener);

})();
