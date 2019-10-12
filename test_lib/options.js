const header = function () {
  const $ = require('jquery');

  return {
    version: function () {
      return $('#js_version').text();
    },
    clickAdd: function () {
      $('#js_button_add_pattern').trigger('click');
    },
    clickExport: function () {
      $('#js_button_export').trigger('click');
    },
    clickImport: function () {
      $('#js_button_import').trigger('click');
    },
  };
};

const exportForm = function () {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return modalIsActivated($('#js_modal_export'));
    },
    json: function () {
      modalShouldActivated($('#js_modal_export'));
      return JSON.parse($('#js_export_display').text());
    },
  };
};

const importForm = function () {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return modalIsActivated($('#js_modal_import'));
    },
    /**
     * @param {string} [input]
     */
    json: function (input) {
      modalShouldActivated($('#js_modal_import'));
      if (typeof input === 'string') {
        $('#js_form_import_json').val(input);
      }
    },
    submit: function () {
      modalShouldActivated($('#js_modal_import'));
      $('#js_form_import_submit').trigger('click');
    },
    /**
     * @returns {string}
     */
    errorMessage: function () {
      modalShouldActivated($('#js_modal_import'));
      return $('#js_import_message').text();
    },
  };
};

const list = function () {
  const $ = require('jquery');

  const all = function () {
    return $('#js_list_pattern tbody').find('tr');
  };

  return {
    /**
     * @returns {string}
     */
    badge: function () {
      return $('#js_pattern_list_badge').text();
    },
    header: function () {
      return $('#js_list_pattern thead').find('tr');
    },
    /**
     * @returns {number}
     */
    numOfItems: function () {
      return all().length;
    },
    /**
     * @param {number} index
     */
    item: function (index) {
      return listItem($(all()[index]));
    },
  };
};

const listItem = function ($item) {
  return {
    pattern: function () {
      return $item.find('.pattern').text();
    },
    message: function () {
      return $item.find('.list-message').text();
    },
    displayPosition: function () {
      return $item.find('.display_position').text();
    },
    status: function () {
      return $item.find('.status').text();
    },
    clickCopy: function () {
      $item.find('.copy_button').trigger('click');
    },
    clickEdit: function () {
      $item.find('.edit_button').trigger('click');
    },
    clickDelete: function () {
      $item.find('.delete_button').trigger('click');
    },
  };
};

const patternForm = function () {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return modalIsActivated($('#js_modal_pattern'));
    },
    /**
     * @param {string} [value]
     * @returns {string}
     */
    pattern: function (value) {
      modalShouldActivated($('#js_modal_pattern'));
      const $element = $('#js_input_url');
      if (typeof value === 'string') {
        $element.val(value);
      }
      return $element.val();
    },
    /**
     * @param {string} [value]
     * @returns {string}
     */
    message: function (value) {
      modalShouldActivated($('#js_modal_pattern'));
      const $element = $('#js_input_msg');
      if (typeof value === 'string') {
        $element.val(value);
      }
      return $element.val();
    },
    /**
     * @param {string} [value]
     * @returns {string}
     */
    backgroundColor: function(value) {
      modalShouldActivated($('#js_modal_pattern'));
      const $element = $('#js_input_background_color');
      if (typeof value === 'string') {
        $element.val(value);
      }
      return $element.val();
    },
    /**
     * @param {string} [value] 'top' or 'bottom'
     * @returns {string}
     */
    displayPosition: function(value) {
      modalShouldActivated($('#js_modal_pattern'));
      const $form = $('#js_form_pattern');
      if (typeof value === 'string') {
        $form.find('input[name=display_position]').val(value);
      }
      return $form.find('input[name=display_position]:checked').val();
    },
    /**
     * @param {boolean} [value]
     * @returns {boolean}
     */
    status: function(value) {
      modalShouldActivated($('#js_modal_pattern'));
      const $element = $('#js_input_status');
      if (typeof value === 'boolean') {
        $element.prop('checked', value);
      }
      return $element.prop('checked');
    },
    submit: function () {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_submit').trigger('click');
    },
    clear: function () {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_clear').trigger('click');
    },
    cancel: function () {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_cancel').trigger('click');
    },
    /**
     * @param {string} name
     * @returns {string}
     */
    errorMessage: function (name) {
      modalShouldActivated($('#js_modal_pattern'));
      if (name === 'display_position') {
        return $('#display_position-error').text();
      }
      if (name === 'status') {
        return $('#status-error').text();
      }
      return $('#js_input_' + name + '-error').text();
    },
  }
};

const deleteForm = function () {
  const $ = require('jquery');

  return {
    shown: function() {
      return modalIsActivated($('#js_modal_delete'));
    },
    pattern: function () {
      modalShouldActivated($('#js_modal_delete'));
      return $('#js_form_delete_pattern').text();
    },
    message: function () {
      modalShouldActivated($('#js_modal_delete'));
      return $('#js_form_delete_message').text();
    },
    submit: function () {
      modalShouldActivated($('#js_modal_delete'));
      $('#js_form_delete_submit').trigger('click');
    },
    cancel: function () {
      modalShouldActivated($('#js_modal_delete'));
      $('#js_form_delete_cancel').trigger('click');
    },
  };
};

/**
 * @param {JQuery} $element
 * @throws {Error}
 */
const modalShouldActivated = function ($element) {
  if (modalIsActivated($element) === false) {
    throw new Error('modal is not activated');
  }
};

/**
 * In the jsdom testing, detect modal is activated by checking
 * that element has following class attributes.
 *
 * - modal
 * - in
 *
 * @param {JQuery} $element
 * @returns {boolean}
 */
const modalIsActivated = function ($element) {
  return $element.hasClass('modal') && $element.hasClass('in');
};

module.exports.header = header;
module.exports.exportForm = exportForm;
module.exports.importForm = importForm;
module.exports.list = list;
module.exports.patternForm = patternForm;
module.exports.deleteForm = deleteForm;
