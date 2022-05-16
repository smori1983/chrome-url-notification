require('../../css/options.scss');
require('../../css/bootstrap-custom.css');

const $ = require('jquery');

require('bootstrap');

const i18n = require('./i18n');
const v3Util = require('./manifest.v3.util');
const StorageLegacy = require('../notification/storage-legacy');

const completed = () => {
  $('#initial-message').hide();
  $('#complete-message').show();
};

$(async () => {
  $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
  i18n.apply($, 'body');

  $('#js_button_options_page').on('click', (e) => {
    e.preventDefault();
    location.href = chrome.runtime.getURL('html/options.html');
  });

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
