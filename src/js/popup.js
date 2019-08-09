$(function () {

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, function(tabs) {
    chrome.runtime.sendMessage(createRequest(tabs), process);
  });

  /**
   * @param {chrome.tabs.Tab[]} tabs
   * @returns {BackgroundRequest}
   */
  const createRequest = function(tabs) {
    return {
      command: 'browser_action:find',
      data: {
        url: tabs[0].url,
      },
    };
  };

  /**
   * @param {FindResult} response
   */
  const process = function(response) {
    if (response.matched === false) {
      $('#block_for_matched_page').hide();
      $('#block_for_separator').hide();

      return;
    }

    $('#status')
      .prop('checked', response.data.status === 1)
      .click(function() {
        updateStatus(response.data.url, $(this).prop('checked') ? 1 : 0);
      });
  };

  /**
   * @param {string} url
   * @param {number} status
   */
  const updateStatus = function(url, status) {
    chrome.runtime.sendMessage({
      command: 'browser_action:update:status',
      data: {
        url: url,
        status: status,
      },
    });
  };
});

$(function () {
  const optionsPath = chrome.runtime.getURL('html/options.html');

  $('<a>')
    .attr('href', optionsPath)
    .attr('target', '_blank')
    .text('Options')
    .appendTo($('#link_options'));
});
