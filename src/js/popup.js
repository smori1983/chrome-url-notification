$(function () {
  $('#i18n_label_status').text(chrome.i18n.getMessage('label_status'));
  $('#i18n_label_enabled').text(chrome.i18n.getMessage('label_enabled'));
});

$(function () {
  /**
   * @param {string} url
   * @returns {BackgroundRequest}
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
    if (response.matched === false) {
      $('#block_for_matched_page').hide();

      return;
    }

    $('#pattern_status')
      .prop('checked', response.data.status === 1)
      .click(function() {
        chrome.runtime.sendMessage({
          command: 'browser_action:update:status',
          data: {
            url: response.data.url,
            status: $(this).prop('checked') ? 1 : 0,
          },
        });
      });
  };

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, function(tabs) {
    chrome.runtime.sendMessage(createRequest(tabs[0].url), process);
  });
});

$(function () {
  $('<a>')
    .attr('href', '#')
    .text(chrome.i18n.getMessage('label_options'))
    .click(function(e) {
      e.preventDefault();
      chrome.tabs.create({
        url: chrome.runtime.getURL('html/options.html'),
      });
    })
    .appendTo($('#link_options'));
});
