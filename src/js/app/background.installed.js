const migration = require('../urlNotification/migration');

const listener = () => {
  migration.execute();
};

const listen = () => {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
