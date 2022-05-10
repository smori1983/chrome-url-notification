const $ = require('jquery');
const StorageLegacy = require('../notification/storage-legacy');

const completed = () => {
  $('#initial-message').hide();
  $('#complete-message').show();
};

$(() => {
  chrome.storage.local.get(['version', 'pattern'], (result) => {
    if (result.version && result.pattern) {
      completed();
    } else {
      const storageLegacy = new StorageLegacy();
      const data = storageLegacy.dump();

      chrome.storage.local.set({
        version: data.version.toString(),
        pattern: JSON.stringify(data.pattern),
      }, () => {
        completed();
      });
    }
  });
});
