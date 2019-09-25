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
  const $container = $('#js_modal_import_container');

  const html = $('#js_modal_import_html').html();

  $container.empty();
  $container.append(html);

  $container.find('#js_form_import').on('submit', function(e) {
    e.preventDefault();
    submit(function () {
      modal.hide();
      callback();
    });
  });

  i18n.apply('#js_modal_import_container');

  const modal = modalFactory.init('#js_modal_import', {
    'shown.bs.modal': function() {
      $('#js_form_import_json').trigger('focus');
    },
  });

  $('#js_form_import_json').val('');
  modal.show();
};

/**
 * @param {function} callback
 */
const submit = function (callback) {
  const $ = require('jquery');
  const $container = $('#js_modal_import_container');

  const error = {
    required: i18n.get('message_json_required'),
    invalidJson: i18n.get('message_json_invalid'),
  };

  const message = messageFactory.init('#js_import_message');

  const jsonText = $container.find('#js_form_import_json').val().trim();

  if (jsonText.length === 0) {
    message.show(error.required);

    return;
  }

  let json;

  try {
    json = JSON.parse(jsonText);
  } catch (e) {
    console.warn(e);
    message.show(error.invalidJson);

    return;
  }

  if (validator.forImportJson(json) === false) {
    message.show(error.invalidJson);

    return;
  }

  importer.importJson(json);

  callback();
};

module.exports.show = show;
