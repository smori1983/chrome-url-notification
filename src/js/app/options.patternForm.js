const Joi = require('joi');
const i18n = require('./i18n');
const config = require('../urlNotification/config');
const storage = require('../urlNotification/storage');
const formFactory = require('./options.util.form');
const modalFactory = require('./options.util.modal');

/**
 * @returns {PatternItem}
 */
const defaultValues = () => {
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
const bindValues = (item) => {
  const $ = require('jquery');

  $('#js_input_url').val(item.url);
  $('#js_input_msg').val(item.msg);
  $('#js_input_background_color').val('#' + item.backgroundColor);
  $('#js_colorpicker').colorpicker('setValue', '#' + item.backgroundColor);
  $('input[name=display_position]').val([item.displayPosition]);
  $('#js_input_status').prop('checked', item.status === 1);
};

/**
 * @returns {PatternItem}
 */
const getRawValues = () => {
  const $ = require('jquery');

  return {
    url: $('#js_input_url').val(),
    msg: $('#js_input_msg').val(),
    background_color: $('#js_input_background_color').val().replace(/^#/, ''),
    display_position: $('input[name=display_position]:checked').val(),
    status: $('#js_input_status').val(),
  };
};

/**
 * @returns {PatternItem}
 */
const getValues = () => {
  const $ = require('jquery');

  return  {
    url: $('#js_input_url').val().trim(),
    msg: $('#js_input_msg').val().trim(),
    backgroundColor: $('#js_input_background_color').val().trim().replace(/^#/, ''),
    displayPosition: $('input[name=display_position]:checked').val().trim(),
    status: $('#js_input_status').is(':checked') ? 1 : 0,
  };
};

const resetValidator = () => {
  const $ = require('jquery');

  $('#js_form_pattern .js_input_error_message').empty();
};

const clear = () => {
  resetValidator();
  bindValues(defaultValues());
};

/**
 * @param {string} mode 'add' or 'edit'
 * @param {PatternItem} item
 * @param {function} callback
 */
const show = (mode, item, callback) => {
  const $ = require('jquery');
  require('bootstrap-colorpicker');

  formFactory.initForm($, '#js_modal_pattern_container', '#js_modal_pattern_html');

  $('#js_colorpicker').colorpicker({
    align: 'left',
    format: 'hex',
  });

  $('#js_form_pattern_clear').on('click', (e) => {
    e.preventDefault();
    clear();
  });

  $('#js_form_pattern').on('submit', (e) => {
    e.preventDefault();
    submit(item, mode, () => {
      modal.hide();
      callback();
    });
  });

  i18n.apply('#js_modal_pattern_container');

  const modal = modalFactory.init($, '#js_modal_pattern', {
    'shown.bs.modal': () => {
      $('#js_input_url').trigger('focus');
    },
  });

  bindValues(item);
  modal.show();
};

/**
 * @param {PatternItem} item
 * @param {string} mode
 * @param {function} callback
 */
const submit = (item, mode, callback) => {
  const $ = require('jquery');

  resetValidator();

  const result = validate(mode, item);
  if (result.error) {
    result.error.details.forEach((item) => {
      const selector = '#js_input_' + item.path[0] + '-error';
      $(selector).text(item.message);
    });

    return;
  }

  const saveData = getValues();

  if (mode === 'add') {
    storage.addPattern(saveData);
  }

  if (mode === 'edit') {
    storage.updatePattern(item.url, saveData);
  }

  callback();
};

/**
 * @param {string} mode
 * @param {PatternItem} item
 */
const validate = (mode, item) => {
  const displayPositionChoices = [
    'top',
    'top_left',
    'top_right',
    'bottom',
    'bottom_left',
    'bottom_right',
  ];
  const custom = setUpJoi();
  const schema = custom.object({
    url: custom.string().required().existingUrl(mode, item.url),
    msg: custom.string().required(),
    background_color: custom.string().required().hexColor(),
    display_position: custom.string().required().in(displayPositionChoices),
    status: custom.string().required().in(['0', '1']),
  });

  return schema.validate(getRawValues(), {
    abortEarly: false,
  });
};

/**
 * @return {Joi.Root}
 */
const setUpJoi = () => {
  return Joi.extend({
    type: 'string',
    base: Joi.string(),
    rules: {
      hexColor: {
        method() {
          return this.$_addRule({
            name: 'hexColor',
          });
        },
        validate(value, helpers) {
          if (/^[0-9a-f]{6}$/i.test(value) === false) {
            return helpers.error('string.hexColor');
          }
        },
      },
      in: {
        args: ['list'],
        method(list) {
          return this.$_addRule({
            name: 'in',
            args: {list},
          });
        },
        validate(value, helpers, { list }) {
          if (list.indexOf(value) < 0) {
            return helpers.error('string.in');
          }
        },
      },
      existingUrl: {
        args: ['mode', 'originalUrl'],
        method(mode, originalUrl) {
          return this.$_addRule({
            name: 'existingUrl',
            args: {mode, originalUrl},
          });
        },
        validate(value, helpers, { mode, originalUrl }) {
          if (mode === 'add') {
            if (storage.findByUrl(value)) {
              return helpers.error('string.existingUrl');
            }
          }

          if (mode === 'edit') {
            if (value !== originalUrl && storage.findByUrl(value)) {
              return helpers.error('string.existingUrl');
            }
          }
        },
      },
    },
    messages: {
      'string.empty': i18n.get('message_field_required'),

      'string.hexColor': i18n.get('message_invalid_color_index'),
      'string.in': i18n.get('message_invalid_choice'),
      'string.existingUrl': i18n.get('message_pattern_existing_url_pattern'),
    },
  });
};

module.exports.defaultValues = defaultValues;
module.exports.show = show;
