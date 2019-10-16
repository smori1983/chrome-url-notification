const popupFind = require('./popup.find');
const $ = require('jquery');

const blockAll = require('./popup.block.all');

$(function () {
  $('#i18n_label_status').text(chrome.i18n.getMessage('label_status'));
  $('#i18n_label_enabled').text(chrome.i18n.getMessage('label_enabled'));
});

$(function () {
  chrome.tabs.query({
    currentWindow: true,
    active: true,
  }, function(/** @type {chrome.tabs.Tab[]} */ tabs) {
    popupFind.sendMessage(tabs[0]);
  });
});

blockAll.show();
