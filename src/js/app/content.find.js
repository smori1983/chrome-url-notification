/**
 * @param {PageInfo} pageInfo
 */
const sendMessage = function(pageInfo) {
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

    const ui = require('./content.ui').init(pageInfo);

    ui.initUI(response.data);
    ui.updateUI(response.data);
  };

  chrome.runtime.sendMessage(createRequest(window.location.href), process);
};

module.exports.sendMessage = sendMessage;
