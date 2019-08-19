'use strict';

$(function() {

  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

  const height = 50;

  const $body = $('body');

  // Keep original margin of body tag.
  const bodyMargin = {
    top: $body.css('marginTop'),
    bottom: $body.css('marginBottom'),
  };

  /**
   * @type {FoundItem}
   */
  let patternItem;

  const cssForBody = (function() {
    const marginTop = function(status) {
      if (status === 1) {
        // workaround for "position: fixed;" page.
        return (height + $body.offset().top) + 'px';
      } else {
        return bodyMargin.top;
      }
    };

    const marginBottom = function(status) {
      if (status === 1) {
        return height + 'px';
      } else {
        return bodyMargin.bottom;
      }
    };

    /**
     * Determine CSS for body tag according to display position and current status.
     *
     * @param {string} displayPosition
     * @param {number} status The latest value should be passed.
     * @returns {Object}
     */
    return function(displayPosition, status) {
      switch (displayPosition) {
        case 'top':
          return {
            marginTop: marginTop(status),
          };
        case 'bottom':
          return {
            marginBottom: marginBottom(status),
          };
        default:
          return {};
      }
    };
  })();

  /**
   * @param {FoundItem} item
   */
  const cssForMessage = function(item) {
    const result = {
      position:   'fixed',
      left:       '0px',
      width:      '100%',
      height:     height + 'px',
      lineHeight: height + 'px',
      background: '#' + item.backgroundColor,
      color:      '#' + item.fontColor,
      fontSize:   '16px',
      textAlign:  'center',
      zIndex:     '99999999',

      webkitUserSelect: 'none',
    };

    result[item.displayPosition] = '0px';

    if (item.status === 0) {
      result.display = 'none';
    }

    return result;
  };

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
      .css(cssForMessage(patternItem))
      .text(patternItem.message);

    $body
      .css(cssForBody(patternItem.displayPosition, patternItem.status))
      .append($container);
  };

  chrome.runtime.sendMessage(createRequest(location.href), process);

  /**
   * @param {TabsRequest} request
   */
  const onMessageListener = function(request) {
    if (request.command === 'tab:notify:status') {
      const selector = '#' + messageContainerId;
      const status = request.data.status;

      $body.css(cssForBody(patternItem.displayPosition, status));

      if (status === 1) {
        $(selector).show();
      } else {
        $(selector).hide();
      }
    }
  };

  chrome.runtime.onMessage.addListener(onMessageListener);

});

/**
 * @typedef {Object} TabsRequest
 * @property {string} command
 * @property {Object} data
 */
