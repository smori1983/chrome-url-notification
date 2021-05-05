const i18n = require('./i18n');
const popupFind = require('./popup.find');

const show = () => {
  i18n.apply('#block_for_matched_page');

  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, (/** @type {chrome.tabs.Tab[]} */ tabs) => {
    popupFind.sendMessage(tabs[0]);
  });
};

module.exports.show = show;
