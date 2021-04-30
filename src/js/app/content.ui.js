const cssFactory = require('./content.css');

const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

/**
 * @param {PageInfo} pageInfo
 */
const main = (pageInfo) => {
  const $ = require('jquery');
  const $body = $('body');

  const css = cssFactory.init(pageInfo);

  return {
    /**
     * @param {FoundItem} item
     */
    initUI: (item) => {
      $('<div>')
        .attr('id', messageContainerId)
        .css(css.forMessage(item))
        .text(item.message)
        .on('mouseover', () => {
          $(this).css(css.forMessageMouseOver(item));
        })
        .on('mouseout', () => {
          $(this).css(css.forMessageMouseOut(item));
        })
        .appendTo($body);
    },
    /**
     * @param {PatternItem|FoundItem} item
     */
    updateUI: (item) => {
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
