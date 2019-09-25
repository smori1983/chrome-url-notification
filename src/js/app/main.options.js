'use strict';

const $ = global.jQuery = require('jquery');
require('jquery-validation');
require('bootstrap');
require('bootstrap-colorpicker');

const i18n = require('./i18n');
const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternList = require('./options.list');
const patternForm = require('./options.patternForm');

const headerComponent = (function() {
  const showVersion = function() {
    $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
  };

  const initEventHandlers = function() {
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

  return {
    init: function() {
      initEventHandlers();
      showVersion();
    },
  };
})();

$(function() {
  headerComponent.init();
  patternList.show();

  i18n.apply('body');
});
