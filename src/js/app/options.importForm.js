const i18n = require('./i18n');
const importer = require('../urlNotification/importer');
const validator = require('../urlNotification/validator');
const formFactory = require('./options.util.form');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

/**
 * @param {function} callback Called when import form submitted
 */
const show = (callback) => {
  const $ = require('jquery');

  formFactory.initForm($, '#js_modal_import_container', '#js_modal_import_html');

  $('#js_form_import').on('submit', (e) => {
    e.preventDefault();
    submit(() => {
      modal.hide();
      callback();
    });
  });

  $('#js_form_import_json').val('');

  i18n.apply('#js_modal_import_container');

  const modal = modalFactory.init('#js_modal_import', {
    'shown.bs.modal': () => {
      $('#js_form_import_json').trigger('focus');
    },
  });

  modal.show();
};

/**
 * @param {function} callback
 */
const submit = (callback) => {
  const $ = require('jquery');

  const jsonText = $('#js_form_import_json').val().trim();

  try {
    const json = parse(jsonText);

    validate(json);
    importer.importJson(/** @type {ImportJson} */ json);
    callback();
  } catch (e) {
    messageFactory
      .init('#js_import_message')
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
