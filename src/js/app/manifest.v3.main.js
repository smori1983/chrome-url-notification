const $ = require('jquery');
const Storage = require('../notification/storage');

const completed = () => {
  $('#initial-message').hide();
  $('#complete-message').show();
};

$(() => {
  chrome.storage.local.get(['version', 'pattern'], (result) => {
    if (result.version && result.pattern) {
      completed();
    } else {
      const storage = new Storage();
      const data = storage.dump();

      chrome.storage.local.set({
        version: data.version.toString(),
        pattern: JSON.stringify(data.pattern),
      }, () => {
        completed();
      });
    }
  });
});
