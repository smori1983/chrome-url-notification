const Migration = require('../url-notification/migration');

const listener = () => {
  const migration = new Migration();
  migration.execute();
};

const listen = () => {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
