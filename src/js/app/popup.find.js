const statusManager = require('./popup.status');

/**
 * @param {chrome.tabs.Tab} tab
 */
const findForTab = (tab) => {
  /**
   * @param {string} url
   * @returns {MessageBrowserActionFind}
   */
  const createRequest = (url) => {
    return {
      command: 'browser_action:find',
      data: {
        url: url,
      },
    };
  };

  /**
   * @param {FindResult} response
   */
  const process = (response) => {
    const $ = require('jquery');

    if (response.matched === false) {
      $('#block_for_matched_page').hide();

      return;
    }

    $('#pattern_status')
      .prop('checked', response.data.status === 1)
      .on('click', (e) => {
        const url = response.data.url;
        const status = $(e.currentTarget).prop('checked') ? 1 : 0;

        statusManager.updateStatus(tab.id, url, status);
      });
  };

  chrome.runtime.sendMessage(createRequest(tab.url), process);
};

module.exports.findForTab = findForTab;
