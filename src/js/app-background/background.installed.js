const v3Util = require('../app/manifest.v3.util');
const Migration = require('../notification/migration');

const listener = async () => {
  if (await v3Util.hasData()) {
    const migration = new Migration();
    await migration.execute();
  }
};

const listen = () => {
  chrome.runtime.onInstalled.addListener(listener);
};

module.exports.listen = listen;
