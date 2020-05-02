const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternForm = require('./options.patternForm');
const patternList = require('./options.list');

const show = function() {
  version();
  handlers();
};

const version = function () {
  const $ = require('jquery');

  $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
};

const handlers = function () {
  const $ = require('jquery');

  $('#js_button_add_pattern').on('click', function(e) {
    e.preventDefault();
    $(e.target).trigger('blur');
    patternForm.show('add', patternForm.defaultValues(), function () {
      patternList.show();
    });
  });

  $('#js_button_export').on('click', function(e) {
    e.preventDefault();
    $(e.target).trigger('blur');
    exportForm.show();
  });

  $('#js_button_import').on('click', function(e) {
    e.preventDefault();
    $(e.target).trigger('blur');
    importForm.show(function() {
      patternList.show();
    })
  });
};

module.exports.show = show;
