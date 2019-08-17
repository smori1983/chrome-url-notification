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

  // Keep value of display position of pattern item when content scripts were loaded.
  let displayPosition;

  const cssForBody = function(status) {
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

    const createCss = function() {
      const result = {
        position:   'fixed',
        left:       '0px',
        width:      '100%',
        height:     height + 'px',
        lineHeight: height + 'px',
        background: '#' + response.data.backgroundColor,
        color:      '#' + response.data.fontColor,
        fontSize:   '16px',
        textAlign:  'center',
        zIndex:     '99999999',

        webkitUserSelect: 'none',
      };

      result[response.data.displayPosition] = '0px';

      if (response.data.status === 0) {
        result.display = 'none';
      }

      return result;
    };

    displayPosition = response.data.displayPosition;

    const $container = $('<div>')
      .attr('id', messageContainerId)
      .css(createCss())
      .text(response.data.message);

    $body
      .css(cssForBody(response.data.status))
      .append($container);
  };

  chrome.runtime.sendMessage(createRequest(location.href), process);

  const onMessageListener = function(request) {
    const selector = '#' + messageContainerId;
    const status = request.data.status;

    $body.css(cssForBody(status));

    if (status === 1) {
      $(selector).show();
    } else {
      $(selector).hide();
    }
  };

  chrome.runtime.onMessage.addListener(onMessageListener);

});
