const popup = require('./popup');

/**
 * @param {chrome.tabs.Tab} tab
 */
const sendMessage = function(tab) {
  /**
   * @param {string} url
   * @returns {MessageBrowserActionFind}
   */
  const createRequest = function(url) {
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
  const process = function(response) {
    const $ = require('jquery');

    if (response.matched === false) {
      $('#block_for_matched_page').hide();

      return;
    }

    $('#pattern_status')
      .prop('checked', response.data.status === 1)
      .on('click', function() {
        const url = response.data.url;
        const status = $(this).prop('checked') ? 1 : 0;

        popup.updateStatus(tab.id, url, status);
      });
  };

  chrome.runtime.sendMessage(createRequest(tab.url), process);
};

module.exports.sendMessage = sendMessage;
