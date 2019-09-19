'use strict';

const contentFind = require('./content.find');
const uiController = require('./uiController').init();

contentFind.sendMessage();

/**
 * @typedef {Object} MessageTabNotifyStatus
 * @property {string} command
 * @property {{item: PatternItem|null, status: number}} data
 */

/**
 * @param {MessageTabNotifyStatus} request
 */
const tabNotifyStatusListener = function(request) {
  if (request.command !== 'tab:notify:status') {
    return;
  }

  if (request.data.item) {
    uiController.updateUI(request.data.item);
  }
};

chrome.runtime.onMessage.addListener(tabNotifyStatusListener);
