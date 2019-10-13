const i18n = require('./i18n');
const config = require('../urlNotification/config');
const storage = require('../urlNotification/storage');
const modalFactory = require('./options.util.modal');

/**
 * @type {PatternItem}
 */
let original;

/**
 * @returns {PatternItem}
 */
const defaultValues = function() {
  return {
    url: '',
    msg: '',
    backgroundColor: config.defaultBackgroundColor(),
    displayPosition: config.defaultDisplayPosition(),
    status: config.defaultStatus(),
  };
};

/**
 * @param {PatternItem} item
 */
const bindValues = function(item) {
  const $ = require('jquery');

  $('#js_input_url').val(item.url);
  $('#js_input_msg').val(item.msg);
  $('#js_input_backgroundcolor').val('#' + item.backgroundColor);
  $('#js_colorpicker').colorpicker('setValue', '#' + item.backgroundColor);
  $('input[name=display_position]').val([item.displayPosition]);
  $('#js_input_status').prop('checked', item.status === 1);
};

const resetValidator = function() {
  const $ = require('jquery');

  $('#js_form_pattern').validate().destroy();
};

const clear = function() {
  resetValidator();
  bindValues(defaultValues());
};

/**
 * @param {string} mode 'add' or 'edit'
 * @param {PatternItem} argOriginal
 * @param {function} callback
 */
const show = function (mode, argOriginal, callback) {
  const $ = require('jquery');
  require('jquery-validation');
  require('bootstrap-colorpicker');

  $('#js_modal_pattern_container')
    .empty()
    .append($('#js_modal_pattern_html').html());

  $('#js_colorpicker').colorpicker({
    align: 'left',
    format: 'hex',
  });

  $('#js_form_pattern_clear').on('click', function(e) {
    e.preventDefault();
    clear();
  });

  $('#js_form_pattern').on('submit', function(e) {
    e.preventDefault();
    submit(mode, function () {
      modal.hide();
      callback();
    });
  });

  original = argOriginal;

  i18n.apply('#js_modal_pattern_container');

  const modal = modalFactory.init('#js_modal_pattern', {
    'shown.bs.modal': function() {
      $('#js_input_url').trigger('focus');
    },
  });

  setUpValidator(mode);
  bindValues($.extend(defaultValues(), original));
  modal.show();
};

/**
 * @param {string} mode
 */
const setUpValidator = function (mode) {
  const $ = require('jquery');

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
};

/**
 * @param {string} mode
 * @param {function} callback
 */
const submit = function(mode, callback) {
  const $ = require('jquery');

  const validator = $('#js_form_pattern').validate(validatorConfig());

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
  // jquery-validation ignores elements that is configured as 'ignore'.
  // The default value is ':hidden'.
  // In jsdom testing, all input fields are detected as ':hidden'.
  // Basically we don't have any fields that should be ignored.
  // Here, we explicitly set empty string to 'ignore' setting.
  //
  // https://jqueryvalidation.org/validate/#ignore

  return {
    ignore: '',
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
