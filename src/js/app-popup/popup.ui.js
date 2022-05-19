const i18n = require('../app/i18n');
const badge = require('../app-background/background.badge');
const Finder = require('../notification/finder');
const Storage = require('../notification/storage');

/**
 * @param {jQuery} $
 */
const showCommonMenu = ($) => {
  $('<a>')
    .attr('href', '#')
    .text(chrome.i18n.getMessage('label_options'))
    .on('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({
        url: chrome.runtime.getURL('html/options.html'),
      }).then();
    })
    .appendTo($('#link_options'));
};

/**
 * @param {jQuery} $
 */
const showMatchedMenu = ($) => {
  i18n.apply($, '#block_for_matched_page');

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, async (tabs) => {
    const finder = new Finder();
    const findResult = await finder.findFor(tabs[0].url);

    if (findResult.matched === false) {
      $('#block_for_matched_page').hide();

      return;
    }

    $('#pattern_status')
      .prop('checked', findResult.data.status === 1)
      .on('click', async (e) => {
        const url = findResult.data.url;
        const status = $(e.currentTarget).prop('checked') ? 1 : 0;

        const storage = new Storage();
        const pattern = await storage.find(url);

        if (pattern) {
          pattern.status = status;
          await storage.updatePattern(url, pattern);

          badge.draw(tabs[0].id, true, status);
        }
      });
  });
};

/**
 * @param {jQuery} $
 */
const init = ($) => {
  showCommonMenu($);
  showMatchedMenu($);
};

module.exports.init = init;
