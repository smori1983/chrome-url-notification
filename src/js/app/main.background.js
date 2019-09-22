const background = require('../urlNotification/background');
const contentFind = require('./background.content.find');
const popupFind = require('./background.popup.find');
const popupUpdateStatus = require('./background.popup.update.status');

const onInstalledListener = function() {
  background.migrate();
};

chrome.runtime.onInstalled.addListener(onInstalledListener);
chrome.runtime.onMessage.addListener(contentFind.listener);
chrome.runtime.onMessage.addListener(popupFind.listener);
chrome.runtime.onMessage.addListener(popupUpdateStatus.listener);
