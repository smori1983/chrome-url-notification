const i18n = require('./i18n');
const config = require('../urlNotification/config');
const storage = require('../urlNotification/storage');
const modalFactory = require('./options.util.modal');

/**
 * @typedef {object} FormValue
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} displayPosition
 * @property {number} status
 */

/**
 * @type {string}
 */
let mode;

/**
 * @type {FormValue}
 */
let original;

/**
 * @type {FormValue}
 */
let current;

let validator;

/**
 * @returns {FormValue}
 */
const defaultValues = function() {
  return {
    url: '',
    message: '',
    backgroundColor: config.defaultBackgroundColor(),
    displayPosition: config.defaultDisplayPosition(),
    status: config.defaultStatus(),
  };
};

const bindValues = function() {
  const $ = require('jquery');

  $('#js_input_url').val(current.url);
  $('#js_input_msg').val(current.message);
  $('#js_input_backgroundcolor').val('#' + current.backgroundColor);
  $('#js_colorpicker').colorpicker('setValue', '#' + current.backgroundColor);
  $('input[name=display_position]').val([current.displayPosition]);
  $('#js_input_status').prop('checked', current.status === 1);
};

const resetValidator = function() {
  if (validator) {
    validator.destroy();
  }
};

const clear = function() {
  current = defaultValues();

  resetValidator();
  bindValues();
};

/**
 * @param {string} argMode 'add' or 'edit'
 * @param {FormValue} argOriginal
 * @param {function} callback
 */
const show = function (argMode, argOriginal, callback) {
  const $ = require('jquery');
  require('jquery-validation');
  require('bootstrap-colorpicker');

  const $container = $('#js_modal_pattern_container');

  const html = $('#js_modal_pattern_html').html();

  $container.empty();
  $container.append(html);

  $container.find('#js_colorpicker').colorpicker({
    align: 'left',
    format: 'hex',
  });

  $container.find('#js_input_clear').on('click', function(e) {
    e.preventDefault();
    clear();
  });

  $container.find('#js_form_pattern').on('submit', function(e) {
    e.preventDefault();
    submit(function () {
      modal.hide();
      callback();
    });
  });

  $.validator.addMethod('hexColor', function(value, element) {
    return this.optional(element) || /^#[0-9a-f]{6}$/i.test(value);
  }, 'Invalid color index.');

  $.validator.addMethod('in', function (value, element, params) {
    return this.optional(element) || params.indexOf(value) >= 0;
  }, 'Invalid choice.');

  $.validator.addMethod('existingUrl', function(value, element) {
    let usable = true;

    if (mode === 'add') {
      usable = storage.findByUrl(value) === null;
    }

    if (mode === 'edit') {
      usable = original.url === value || storage.findByUrl(value) === null;
    }

    return this.optional(element) || usable;
  }, 'Existing URL.');

  mode = argMode;
  original = argOriginal;

  current = $.extend(defaultValues(), original);

  i18n.apply('#js_modal_pattern_container');

  const modal = modalFactory.init('#js_modal_pattern', {
    'shown.bs.modal': function() {
      $('#js_input_url').trigger('focus');
    },
  });

  resetValidator();
  bindValues();
  modal.show();
};

/**
 * @param {function} callback
 */
const submit = function(callback) {
  const $ = require('jquery');

  validator = $('#js_form_pattern').validate(validatorConfig());

  if (validator.form() === false) {
    return;
  }

  const saveData = {
    url: $('#js_input_url').val().trim(),
    msg: $('#js_input_msg').val().trim(),
    backgroundColor: $('#js_input_background_color').val().trim().replace(/^#/, ''),
    displayPosition: $('input[name=display_position]:checked').val().trim(),
    status: $('#js_input_status').is(':checked') ? 1 : 0,
  };

  if (mode === 'add') {
    storage.addPattern(saveData);
  }

  if (mode === 'edit') {
    storage.updatePattern(original.url, saveData);
  }

  callback();
};

const validatorConfig = function() {
  return {
    rules: {
      url: {
        required: true,
        existingUrl: true,
      },
      message: {
        required: true,
      },
      background_color: {
        required: true,
        hexColor: true,
      },
      display_position: {
        required: true,
        in: ['top', 'bottom'],
      },
      status: {
        required: false,
        in: ['1'],
      },
    },
    messages: {
      url: {
        required: i18n.get('message_field_required'),
        existingUrl: i18n.get('message_pattern_existing_url_pattern'),
      },
      message: {
        required: i18n.get('message_field_required'),
      },
      background_color: {
        required: i18n.get('message_field_required'),
        hexColor: i18n.get('message_invalid_color_index'),
      },
      display_position: {
        required: i18n.get('message_field_required'),
        in: i18n.get('message_invalid_choice'),
      },
      status: {
        required: i18n.get('message_field_required'),
        in: i18n.get('message_invalid_choice'),
      },
    },
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    errorClass: 'text-danger',
    errorElement: 'div',
    errorPlacement: function (error, element) {
      if (element.attr('name') === 'background_color') {
        error.appendTo(element.parent().parent());
      } else if (element.attr('name') === 'display_position') {
        error.appendTo(element.parent().parent());
      } else if (element.attr('name') === 'status') {
        error.appendTo(element.parent().parent());
      } else {
        error.insertAfter(element);
      }
    },
  };
};

module.exports.show = show;
