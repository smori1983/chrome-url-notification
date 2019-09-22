const installed = require('./background.installed');
const contentFind = require('./background.content.find');
const popupFind = require('./background.popup.find');
const popupUpdateStatus = require('./background.popup.update.status');

chrome.runtime.onInstalled.addListener(installed.listener);
chrome.runtime.onMessage.addListener(contentFind.listener);
chrome.runtime.onMessage.addListener(popupFind.listener);
chrome.runtime.onMessage.addListener(popupUpdateStatus.listener);
