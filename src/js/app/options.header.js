const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternForm = require('./options.patternForm');
const patternList = require('./options.list');

const show = () => {
  version();
  handlers();
};

const version = () => {
  const $ = require('jquery');

  $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
};

const handlers = () => {
  const $ = require('jquery');

  $('#js_button_add_pattern').on('click', (e) => {
    e.preventDefault();
    $(e.target).trigger('blur');
    patternForm.show('add', patternForm.defaultValues(), () => {
      patternList.refresh();
    });
  });

  $('#js_button_export').on('click', (e) => {
    e.preventDefault();
    $(e.target).trigger('blur');
    exportForm.show();
  });

  $('#js_button_import').on('click', (e) => {
    e.preventDefault();
    $(e.target).trigger('blur');
    importForm.show(() => {
      patternList.refresh();
    })
  });
};

module.exports.show = show;
