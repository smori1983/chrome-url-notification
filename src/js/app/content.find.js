/**
 * @param {PageInfo} pageInfo
 */
const sendMessage = (pageInfo) => {
  /**
   * @param {string} url
   * @returns {MessageContentScriptsFind}
   */
  const createRequest = (url) => {
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
  const process = (response) => {
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
