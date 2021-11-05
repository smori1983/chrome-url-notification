const Color = require('color-js');

const header = () => {
  const $ = require('jquery');

  return {
    version: () => {
      return $('#js_version').text();
    },
    clickAdd: () => {
      $('#js_button_add_pattern').trigger('click');
    },
    clickExport: () => {
      $('#js_button_export').trigger('click');
    },
    clickImport: () => {
      $('#js_button_import').trigger('click');
    },
  };
};

const exportForm = () => {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: () => {
      return modalIsActivated($('#js_modal_export'));
    },
    json: () => {
      modalShouldActivated($('#js_modal_export'));
      return JSON.parse($('#js_export_display').text());
    },
  };
};

const importForm = () => {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: () => {
      return modalIsActivated($('#js_modal_import'));
    },
    /**
     * @param {string} [input]
     */
    json: (input) => {
      modalShouldActivated($('#js_modal_import'));
      if (typeof input === 'string') {
        $('#js_form_import_json').val(input);
      }
    },
    submit: () => {
      modalShouldActivated($('#js_modal_import'));
      $('#js_form_import_submit').trigger('click');
    },
    /**
     * @returns {string}
     */
    errorMessage: () => {
      modalShouldActivated($('#js_modal_import'));
      return $('#js_import_message').text();
    },
  };
};

const list = () => {
  const $ = require('jquery');

  const all = () => {
    return $('#js_list_pattern tbody').find('tr');
  };

  return {
    /**
     * @returns {string}
     */
    badge: () => {
      return $('#js_pattern_list_badge').text();
    },
    header: () => {
      return $('#js_list_pattern thead').find('tr');
    },
    /**
     * @returns {number}
     */
    numOfItems: () => {
      return all().length;
    },
    /**
     * @param {number} index
     */
    item: (index) => {
      return listItem($(all()[index]));
    },
  };
};

const listItem = ($item) => {
  return {
    pattern: () => {
      return $item.find('.pattern').text();
    },
    message: () => {
      return $item.find('.list-message').text();
    },
    backgroundColor: () => {
      const color = Color($item.find('.list-message').css('background-color'));
      return color.toCSS();
    },
    displayPosition: () => {
      return $item.find('.display_position').text();
    },
    status: () => {
      return $item.find('.status').text();
    },
    clickCopy: () => {
      $item.find('.copy_button').trigger('click');
    },
    clickEdit: () => {
      $item.find('.edit_button').trigger('click');
    },
    clickDelete: () => {
      $item.find('.delete_button').trigger('click');
    },
  };
};

const patternForm = () => {
  const $ = require('jquery');

  return {
    /**
     * @returns {boolean}
     */
    shown: () => {
      return modalIsActivated($('#js_modal_pattern'));
    },
    /**
     * @param {string} [value]
     * @returns {string}
     */
    pattern: (value) => {
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
    message: (value) => {
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
    backgroundColor: (value) => {
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
    displayPosition: (value) => {
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
    status: (value) => {
      modalShouldActivated($('#js_modal_pattern'));
      const $element = $('#js_input_status');
      if (typeof value === 'boolean') {
        $element.prop('checked', value);
      }
      return $element.prop('checked');
    },
    submit: () => {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_submit').trigger('click');
    },
    clear: () => {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_clear').trigger('click');
    },
    cancel: () => {
      modalShouldActivated($('#js_modal_pattern'));
      $('#js_form_pattern_cancel').trigger('click');
    },
    /**
     * @param {string} name
     * @returns {string}
     */
    errorMessage: (name) => {
      modalShouldActivated($('#js_modal_pattern'));
      return $('#js_input_' + name + '-error').text();
    },
  }
};

const deleteForm = () => {
  const $ = require('jquery');

  return {
    shown: () => {
      return modalIsActivated($('#js_modal_delete'));
    },
    pattern: () => {
      modalShouldActivated($('#js_modal_delete'));
      return $('#js_form_delete_pattern').text();
    },
    message: () => {
      modalShouldActivated($('#js_modal_delete'));
      return $('#js_form_delete_message').text();
    },
    submit: () => {
      modalShouldActivated($('#js_modal_delete'));
      $('#js_form_delete_submit').trigger('click');
    },
    cancel: () => {
      modalShouldActivated($('#js_modal_delete'));
      $('#js_form_delete_cancel').trigger('click');
    },
  };
};

/**
 * @param {JQuery} $element
 * @throws {Error}
 */
const modalShouldActivated = ($element) => {
  if (modalIsActivated($element) === false) {
    /* istanbul ignore next */
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
const modalIsActivated = ($element) => {
  return $element.hasClass('modal') && $element.hasClass('in');
};

module.exports.header = header;
module.exports.exportForm = exportForm;
module.exports.importForm = importForm;
module.exports.list = list;
module.exports.patternForm = patternForm;
module.exports.deleteForm = deleteForm;
