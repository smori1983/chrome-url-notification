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

  /**
   * @param {string} property
   * @returns {string}
   */
  const css = (property) => {
    return container().css(property);
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
      return exists() && css('display') === 'block';
    },
    /**
     * @returns {boolean}
     */
    hidden: () => {
      return exists() && css('display') === 'none';
    },
    /**
     * @param {string} text
     * @returns {boolean}
     */
    styleContains: (text) => {
      const styleAttr = container().attr('style') || '';

      return styleAttr.indexOf(text) >= 0;
    },
    /**
     * @param {string} property
     * @returns {string}
     */
    css: (property) => {
      return css(property);
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
