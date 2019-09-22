'use strict';

const cssFactory = require('./content.css');

const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

const main = function () {
  const $ = require('jquery');
  const $body = $('body');

  const css = cssFactory.init({
    body: {
      marginTop: $body.css('marginTop'),
      marginBottom: $body.css('marginBottom'),
    },
  });

  return {
    /**
     * @param {FoundItem} item
     */
    initUI: function(item) {
      $('<div>')
        .attr('id', messageContainerId)
        .css(css.forMessage(item))
        .text(item.message)
        .appendTo($body);
    },
    /**
     * @param {PatternItem|FoundItem} item
     */
    updateUI: function(item) {
      const selector = '#' + messageContainerId;

      if (item.status === 1) {
        $(selector).show();
      } else {
        $(selector).hide();
      }

      $body.css(css.forBody(item.displayPosition, item.status));
    },
  };
};

module.exports.init = main;
