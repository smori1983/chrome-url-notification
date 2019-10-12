const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternForm = require('./options.patternForm');
const patternList = require('./options.list');

const show = function() {
  const $ = require('jquery');

  $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);

  $('#js_button_add_pattern').on('click', function(e) {
    e.preventDefault();
    patternForm.show('add', {}, function () {
      patternList.show();
    });
  });

  $('#js_button_export').on('click', function(e) {
    e.preventDefault();
    exportForm.show();
  });

  $('#js_button_import').on('click', function(e) {
    e.preventDefault();
    importForm.show(function() {
      patternList.show();
    })
  });
};

module.exports.show = show;