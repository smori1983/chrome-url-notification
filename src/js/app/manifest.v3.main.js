const $ = require('jquery');
const v3Util = require('./manifest.v3.util');
const StorageLegacy = require('../notification/storage-legacy');

const completed = () => {
  $('#initial-message').hide();
  $('#complete-message').show();
};

$(async () => {
  if (await v3Util.hasData()) {
    completed();
  } else {
    const storageLegacy = new StorageLegacy();
    const data = storageLegacy.dump();

    await chrome.storage.local.set({
      version: data.version.toString(),
      pattern: JSON.stringify(data.pattern),
    });

    completed();
  }
});
