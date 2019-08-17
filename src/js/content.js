'use strict';

$(function() {

  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

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

    const height = 50;

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

      return result;
    };

    const $body = $('body');

    const $container = $('<div>')
      .attr('id', messageContainerId)
      .css(createCss())
      .text(response.data.message);

    if (response.data.displayPosition === 'top') {
      //
      // workaround for "position: fixed;" page.
      //
      $body
        .css({ marginTop: (height + $body.offset().top) + 'px' })
        .append($container);
    } else if (response.data.displayPosition === 'bottom') {
      $body
        .css({ marginBottom: height + 'px' })
        .append($container);
    }
  };

  chrome.runtime.sendMessage(createRequest(location.href), process);

  const onMessageListener = function(request) {
    const selector = '#' + messageContainerId;
    const status = request.data.status;

    if (status === 1) {
      $(selector).show();
    } else {
      $(selector).hide();
    }
  };

  chrome.runtime.onMessage.addListener(onMessageListener);

});
