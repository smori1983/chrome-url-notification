'use strict';

const uiController = require('./uiController').init();

/**
 * @param {string} url
 * @returns {BackgroundRequest}
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
 * @param {TabsRequest} request
 */
const tabNotifyStatusListener = function(request) {
  if (request.command !== 'tab:notify:status') {
    return;
  }

  /** @type {PatternItem|null} */
  const item = request.data.item;

  if (item) {
    uiController.updateUI(item);
  }
};

chrome.runtime.onMessage.addListener(tabNotifyStatusListener);

/**
 * @typedef {Object} TabsRequest
 * @property {string} command
 * @property {Object} data
 */
