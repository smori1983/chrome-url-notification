const i18n = require('./i18n');
const popupFind = require('./popup.find');

const show = function () {
  i18n.apply('#block_for_matched_page');

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, function(/** @type {chrome.tabs.Tab[]} */ tabs) {
    popupFind.sendMessage(tabs[0]);
  });
};

module.exports.show = show;
