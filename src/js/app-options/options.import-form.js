const Importer = require('../notification/importer');
const Validator = require('../notification/validator');
const i18n = require('../app/i18n');
const formFactory = require('./options.util.form');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

const importer = new Importer();
const validator = new Validator();

/**
 * @param {jQuery} $
 * @param {function} callback Called when import form submitted
 */
const show = ($, callback) => {
  formFactory.initForm($, '#js_modal_import_container', '#js_modal_import_html');

  $('#js_form_import').on('submit', async (e) => {
    e.preventDefault();
    await submit($, () => {
      modal.hide();
      callback();
    });
  });

  $('#js_form_import_json').val('');

  i18n.apply($, '#js_modal_import_container');

  const modal = modalFactory.init($, '#js_modal_import', {
    'shown.bs.modal': () => {
      $('#js_form_import_json').trigger('focus');
    },
  });

  modal.show();
};

/**
 * @param {jQuery} $
 * @param {function} callback
 */
const submit = async ($, callback) => {
  const jsonText = $('#js_form_import_json').val().trim();

  try {
    const json = parse(jsonText);

    validate(json);

    await importer.importJson(/** @type {ImportJson} */ json);

    callback();
  } catch (e) {
    messageFactory
      .init($, '#js_import_message')
      .show(e.message);
  }
};

/**
 * @param {string} jsonText
 */
const parse = (jsonText) => {
  if (jsonText.length === 0) {
    throw new Error(i18n.get('message_json_required'));
  }

  try {
    return JSON.parse(jsonText);
  } catch (e) {
    throw new Error(i18n.get('message_json_invalid'));
  }
};

const validate = (json) => {
  if (validator.forImportJson(json) === false) {
    throw new Error(i18n.get('message_json_invalid'));
  }
};

module.exports.show = show;
