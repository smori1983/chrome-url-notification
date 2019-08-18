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

  const badge = (function() {
    const determineText = function(matched, status) {
      if (matched && status === 1) {
        return 'ON';
      } else if (matched && status === 0) {
        return 'OFF';
      } else {
        return '';
      }
    };

    /**
     * @param {number} tabId
     * @param {boolean} matched
     * @param {(number|null)} status
     */
    const draw = function(tabId, matched, status) {
      chrome.browserAction.setBadgeText({
        text: determineText(matched, status),
        tabId: tabId,
      });
    };

    return {
      draw: draw,
    };
  })();

  chrome.runtime.onInstalled.addListener(onInstalledListener);
  chrome.runtime.onMessage.addListener(onMessageListener);

})();
