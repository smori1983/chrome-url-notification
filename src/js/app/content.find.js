const uiFactory = require('./content.ui');

/**
 * @param {jQuery} $
 * @param {PageInfo} pageInfo
 */
const findForPage = ($, pageInfo) => {
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

    const ui = uiFactory.init($, pageInfo);

    ui.initUI(response.data);
    ui.updateUI(response.data);
  };

  chrome.runtime.sendMessage(createRequest(pageInfo.location.href), process);
};

module.exports.findForPage = findForPage;
