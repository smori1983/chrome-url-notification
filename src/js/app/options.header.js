const exportForm = require('./options.export-form');
const importForm = require('./options.import-form');
const oldDataForm = require('./options.old-data-form');
const patternForm = require('./options.pattern-form');
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
    patternForm.show($, 'add', patternForm.defaultValues(), async () => {
      await patternList.refresh($);
    });
  });

  onClick('#js_button_export', async () => {
    await exportForm.show($);
  });

  onClick('#js_button_import', () => {
    importForm.show($, async () => {
      await patternList.refresh($);
    })
  });

  onClick('#js_button_old_data', () => {
    oldDataForm.show($);
  });
};

module.exports.show = show;
