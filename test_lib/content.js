const page = () => {
  const $ = require('jquery');

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

const message = () => {
  const messageContainerId = 'chrome-url-notification-container-9b7414d403c1287ca963';

  const $ = require('jquery');

  const container = () => {
    return $('#' + messageContainerId);
  };

  const exists = () => {
    return container().length === 1;
  };

  return {
    jqueryObject: () => {
      return container();
    },
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
  }
};

module.exports.page = page;
module.exports.message = message;
