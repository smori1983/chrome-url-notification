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

  const container = function () {
    return $('#' + messageContainerId);
  };

  const exists = function () {
    return container().length === 1;
  };

  return {
    jqueryObject: function () {
      return container();
    },
    /**
     * @returns {boolean}
     */
    exists: function () {
      return exists();
    },
    /**
     * @returns {boolean}
     */
    shown: function () {
      return exists() && container().css('display') === 'block';
    },
    /**
     * @returns {boolean}
     */
    hidden: function () {
      return exists() && container().css('display') === 'none';
    },
  }
};

module.exports.page = page;
module.exports.message = message;
