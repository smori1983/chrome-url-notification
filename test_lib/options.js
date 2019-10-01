const exportForm = function () {
  const $ = require('jquery');

  const checkModalIsActivated = function () {
    if ($('#js_modal_export').css('display') !== 'block') {
      throw new Error('modal is not activated');
    }
  };

  return {
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
     * @returns {string}
     */
    pattern: function () {
      return $('#js_input_url').val();
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

module.exports.exportForm = exportForm;
module.exports.importForm = importForm;
module.exports.list = list;
module.exports.patternForm = patternForm;
module.exports.deleteForm = deleteForm;
