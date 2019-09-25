'use strict';

const $ = global.jQuery = require('jquery');
require('jquery-validation');
require('bootstrap');
require('bootstrap-colorpicker');

const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternList = require('./options.list');
const patternForm = require('./options.patternForm');

const i18n = (function() {
  const init = function() {
    $('*[data-i18n]').each(function () {
      $(this).text(get($(this).data('i18n')));
    });

    $('*[data-i18n-val]').each(function () {
      $(this).val(get($(this).data('i18n-val')));
    });

    $('*[data-i18n-ph]').each(function () {
      $(this).attr('placeholder', get($(this).data('i18n-ph')));
    });
  };

  /**
   * @param {string} key
   * @returns {string}
   */
  const get = function(key) {
    return chrome.i18n.getMessage(key);
  };

  return {
    init: init,
    get: get,
  };
})();

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

  i18n.init();
});
