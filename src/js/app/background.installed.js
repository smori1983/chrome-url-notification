const background = require('../urlNotification/background');

const listener = function () {
  background.migrate();
};

const listen = function () {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
