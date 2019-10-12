const i18n = require('./i18n');
const importer = require('../urlNotification/importer');
const validator = require('../urlNotification/validator');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

/**
 * @param {function} callback Called when import form submitted
 */
const show = function (callback) {
  const $ = require('jquery');

  $('#js_modal_import_container')
    .empty()
    .append($('#js_modal_import_html').html());

  $('#js_form_import')
    .on('submit', function(e) {
      e.preventDefault();
      submit(function () {
        modal.hide();
        callback();
      });
    });

  $('#js_form_import_json').val('');

  i18n.apply('#js_modal_import_container');

  const modal = modalFactory.init('#js_modal_import', {
    'shown.bs.modal': function() {
      $('#js_form_import_json').trigger('focus');
    },
  });

  modal.show();
};

/**
 * @param {function} callback
 */
const submit = function (callback) {
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
const parse = function (jsonText) {
  if (jsonText.length === 0) {
    throw new Error(i18n.get('message_json_required'));
  }

  try {
    return JSON.parse(jsonText);
  } catch (e) {
    throw new Error(i18n.get('message_json_invalid'));
  }
};

const validate = function (json) {
  if (validator.forImportJson(json) === false) {
    throw new Error(i18n.get('message_json_invalid'));
  }
};

module.exports.show = show;
