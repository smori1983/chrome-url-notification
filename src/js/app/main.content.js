'use strict';

const uiController = require('./uiController').init();

/**
 * @param {string} url
 * @returns {MessageContentScriptsFind}
 */
const createRequest = function(url) {
  return {
    command: 'content_scripts:find',
    data: {
      url: url,
    },
  };
};

/**
 * @param {FindResult} response
 */
const process = function(response) {
  if (response.matched === false) {
    return;
  }

  uiController.initUI(response.data);
  uiController.updateUI(response.data);
};

chrome.runtime.sendMessage(createRequest(location.href), process);

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
