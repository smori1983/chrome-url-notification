const i18n = require('./i18n');
const popupFind = require('./popup.find');

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
      });
    })
    .appendTo($('#link_options'));
};

/**
 * @param {jQuery} $
 */
const showMatchedMenu = ($) => {
  i18n.apply2($, '#block_for_matched_page');

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, (/** @type {chrome.tabs.Tab[]} */ tabs) => {
    popupFind.findForTab($, tabs[0]);
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
