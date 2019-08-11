/**
 * @typedef BackgroundRequest
 * @property {string} command
 * @property {object} data
 */

(function() {

  const background = require('url-notification').background;

  chrome.runtime.onInstalled.addListener(function() {
    background.migrate();
  });

  chrome.runtime.onMessage.addListener(function(/** @type {BackgroundRequest} */ request, sender, sendResponse) {
    if (request.command === 'content_scripts:find') {
      sendResponse(background.find(request.data.url, { ignoreStatus: false }));
    }

    if (request.command === 'browser_action:find') {
      sendResponse(background.find(request.data.url, { ignoreStatus: true }));
    }

    if (request.command === 'browser_action:update:status') {
      background.updatePattern(request.data.url, { status: request.data.status });
    }
  });

})();
