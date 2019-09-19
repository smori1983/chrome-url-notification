const sendMessage = function() {
  /**
   * @param {string} url
   * @returns {MessageContentScriptsFind}
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

    const uiController = require('./uiController').init();

    uiController.initUI(response.data);
    uiController.updateUI(response.data);
  };

  chrome.runtime.sendMessage(createRequest(window.location.href), process);
};

module.exports.sendMessage = sendMessage;
