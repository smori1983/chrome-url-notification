const background = require('../urlNotification/background');

const listener = () => {
  background.migrate();
};

const listen = () => {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
