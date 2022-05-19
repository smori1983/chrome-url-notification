/**
 * @param {jQuery} $
 * @param {string} selector
 */
const main = ($, selector) => {
  let timeoutId = null;

  /**
   * @param {string} message
   */
  const show = (message) => {
    $(selector).text(message);

    if (timeoutId !== null) {
      /* istanbul ignore next */
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      hide();
    }, 3000);
  };

  const hide = () => {
    $(selector).empty();
  };

  return {
    show: show,
    hide: hide,
  };
};

module.exports.init = main;
