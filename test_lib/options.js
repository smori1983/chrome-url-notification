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

  const checkModalIsActivated = function () {
    if ($('#js_modal_export').css('display') !== 'block') {
      throw new Error('modal is not activated');
    }
  };

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return $('#js_modal_export').css('display') === 'block';
    },
    json: function () {
      checkModalIsActivated();
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
      return $('#js_modal_import').css('display') === 'block';
    },
    /**
     * @param {string} [input]
     */
    json: function (input) {
      if (typeof input === 'string') {
        $('#js_form_import_json').val(input);
      }
    },
    submit: function () {
      $('#js_form_import_submit').trigger('click');
    },
    /**
     * @returns {string}
     */
    errorMessage: function () {
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
      return $('#js_modal_pattern').css('display') === 'block';
    },
    /**
     * @param {string} [value]
     * @returns {string}
     */
    pattern: function (value) {
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
      const $element = $('#js_input_status');
      if (typeof value === 'boolean') {
        $element.prop('checked', value);
      }
      return $element.prop('checked');
    },
    submit: function () {
      $('#js_form_pattern_submit').trigger('click');
    },
    /**
     * @param {string} name
     * @returns {string}
     */
    errorMessage: function (name) {
      return $('#js_input_' + name + '-error').text();
    },
  }
};

const deleteForm = function () {
  const $ = require('jquery');

  const checkModalIsActivated = function () {
    if ($('#js_modal_delete').css('display') !== 'block') {
      throw new Error('modal is not activated');
    }
  };

  return {
    shown: function() {
      return $('#js_modal_delete').css('display') === 'block';
    },
    pattern: function () {
      return $('#js_form_delete_pattern').text();
    },
    message: function () {
      return $('#js_form_delete_message').text();
    },
    submit: function () {
      checkModalIsActivated();
      $('#js_form_delete_submit').trigger('click');
    },
    cancel: function () {
      checkModalIsActivated();
      $('#js_form_delete_cancel').trigger('click');
    },
  };
};

module.exports.header = header;
module.exports.exportForm = exportForm;
module.exports.importForm = importForm;
module.exports.list = list;
module.exports.patternForm = patternForm;
module.exports.deleteForm = deleteForm;
