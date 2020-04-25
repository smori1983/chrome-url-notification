const page = function () {
  const $ = require('jquery');

  return {
    /**
     * @returns {string}
     */
    marginTop: function () {
      return $('body').css('margin-top');
    },
    /**
     * @returns {string}
     */
    marginBottom: function () {
      return $('body').css('margin-bottom');
    },
  };
};

const message = function () {
  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

  const $ = require('jquery');

  const getContainer = function () {
    return $('#' + messageContainerId);
  };

  return {
    getJqueryObject: function () {
      return getContainer();
    },
    /**
     * @returns {boolean}
     */
    exists: function () {
      const $container = getContainer();

      return $container.length > 0;
    },
    /**
     * @returns {boolean}
     */
    shown: function () {
      const $container = getContainer();

      return $container.length > 0 && $container.css('display') === 'block';
    },
    /**
     * @returns {boolean}
     */
    hidden: function () {
      const $container = getContainer();

      return $container.length > 0 && $container.css('display') === 'none';
    },
  }
};

module.exports.page = page;
module.exports.message = message;
