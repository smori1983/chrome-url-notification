const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const patternForm = require('./options.patternForm');
const patternList = require('./options.list');

/**
 * @param {jQuery} $
 */
const show = ($) => {
  version($);
  handlers($);
};

/**
 * @param {jQuery} $
 */
const version = ($) => {
  $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
};

/**
 * @param {jQuery} $
 */
const handlers = ($) => {
  const onClick = (selector, callback) => {
    $(selector).on('click', (e) => {
      e.preventDefault();
      $(e.target).trigger('blur');
      callback();
    });
  };

  onClick('#js_button_add_pattern', () => {
    patternForm.show($, 'add', patternForm.defaultValues(), () => {
      patternList.refresh($);
    });
  });

  onClick('#js_button_export', () => {
    exportForm.show($);
  });

  onClick('#js_button_import', () => {
    importForm.show($, () => {
      patternList.refresh($);
    })
  });
};

module.exports.show = show;
