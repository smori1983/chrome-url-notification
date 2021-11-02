/**
 * @param {jQuery} $
 */
const page = ($) => {
  return {
    /**
     * @returns {string}
     */
    marginTop: () => {
      return $('body').css('margin-top');
    },
    /**
     * @returns {string}
     */
    marginBottom: () => {
      return $('body').css('margin-bottom');
    },
  };
};

/**
 * @param {jQuery} $
 */
const message = ($) => {
  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

  const container = () => {
    return $('#' + messageContainerId);
  };

  const exists = () => {
    return container().length === 1;
  };

  return {
    /**
     * @returns {boolean}
     */
    exists: () => {
      return exists();
    },
    /**
     * @returns {boolean}
     */
    shown: () => {
      return exists() && container().css('display') === 'block';
    },
    /**
     * @returns {boolean}
     */
    hidden: () => {
      return exists() && container().css('display') === 'none';
    },
    mouseover: () => {
      container().trigger('mouseover');
    },
    mouseout: () => {
      container().trigger('mouseout');
    },
  }
};

module.exports.page = page;
module.exports.message = message;
