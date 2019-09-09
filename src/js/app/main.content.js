'use strict';

const cssFactory = require('./css');
const $ = require('jquery');

$(function() {

  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

  const $body = $('body');

  const css = cssFactory.init({
    body: {
      marginTop: $body.css('marginTop'),
      marginBottom: $body.css('marginBottom'),
    },
  });

  /**
   * @type {FoundItem}
   */
  let patternItem;

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

    patternItem = response.data;

    const $container = $('<div>')
      .attr('id', messageContainerId)
      .css(css.forMessage(patternItem))
      .text(patternItem.message);

    $body
      .css(css.forBody(patternItem.displayPosition, patternItem.status))
      .append($container);
  };

  chrome.runtime.sendMessage(createRequest(location.href), process);

  /**
   * @param {TabsRequest} request
   */
  const tabNotifyStatusListener = function(request) {
    if (request.command !== 'tab:notify:status') {
      return;
    }

    const selector = '#' + messageContainerId;
    const status = request.data.status;

    $body.css(css.forBody(patternItem.displayPosition, status));

    if (status === 1) {
      $(selector).show();
    } else {
      $(selector).hide();
    }
  };

  chrome.runtime.onMessage.addListener(tabNotifyStatusListener);

});

/**
 * @typedef {Object} TabsRequest
 * @property {string} command
 * @property {Object} data
 */
