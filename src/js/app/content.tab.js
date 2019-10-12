'use strict';

/**
 * @typedef {Object} MessageTabNotifyStatus
 * @property {string} command
 * @property {{item: PatternItem|null, status: number}} data
 */

const listen = function () {
  /**
   * @param {MessageTabNotifyStatus} request
   */
  const tabNotifyStatusListener = function(request) {
    /* istanbul ignore next */
    if (request.command !== 'tab:notify:status') {
      return;
    }

    if (request.data.item) {
      const ui = require('./content.ui').init();

      ui.updateUI(request.data.item);
    }
  };

  chrome.runtime.onMessage.addListener(tabNotifyStatusListener);
};

module.exports.listen = listen;
