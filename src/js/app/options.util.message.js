/**
 * @param {string} selector
 */
const main = function (selector) {
  const $ = global.jQuery = require('jquery');

  let timeoutId = null;

  /**
   * @param {string} message
   */
  const show = function (message) {
    $(selector).text(message);

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(function() {
      timeoutId = null;
      hide();
    }, 3000);
  };

  const hide = function () {
    $(selector).empty();
  };

  return {
    show: show,
    hide: hide,
  };
};

module.exports.init = main;
