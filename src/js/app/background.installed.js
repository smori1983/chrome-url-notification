const migration = require('../url-notification/migration');

const listener = () => {
  migration.execute();
};

const listen = () => {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
