'use strict';

const cssFactory = require('./css');
const $ = require('jquery');

const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

const $body = $('body');

const css = cssFactory.init({
  body: {
    marginTop: $body.css('marginTop'),
    marginBottom: $body.css('marginBottom'),
  },
});

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

  initUI(response.data);
  updateUI(response.data);
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
    updateUI(item);
  }
};

chrome.runtime.onMessage.addListener(tabNotifyStatusListener);

/**
 * @param {FoundItem} item
 */
const initUI = function(item) {
  $('<div>')
    .attr('id', messageContainerId)
    .css(css.forMessage(item))
    .text(item.message)
    .appendTo($body);
};

/**
 * @param {PatternItem|FoundItem} item
 */
const updateUI = function(item) {
  const selector = '#' + messageContainerId;

  if (item.status === 1) {
    $(selector).show();
  } else {
    $(selector).hide();
  }

  $body.css(css.forBody(item.displayPosition, item.status));
};

/**
 * @typedef {Object} TabsRequest
 * @property {string} command
 * @property {Object} data
 */
