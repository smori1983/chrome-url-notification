'use strict';

const $ = global.jQuery = require('jquery');
require('jquery-validation');
require('bootstrap');
require('bootstrap-colorpicker');

const urlNotification = require('./../urlNotification/main');
const modalFactory = require('./options.util.modal');

const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const deleteForm = require('./options.deleteForm');

const util = (function() {
  const rebind = function(selector, eventName, callback) {
    $(selector).off(eventName).on(eventName, callback);
  };

  return {
    rebind: rebind,
  };
})();

const i18n = (function() {
  const init = function() {
    $('*[data-i18n]').each(function () {
      $(this).text(get($(this).data('i18n')));
    });

    $('*[data-i18n-val]').each(function () {
      $(this).val(get($(this).data('i18n-val')));
    });

    $('*[data-i18n-ph]').each(function () {
      $(this).attr('placeholder', get($(this).data('i18n-ph')));
    });
  };

  /**
   * @param {string} key
   * @returns {string}
   */
  const get = function(key) {
    return chrome.i18n.getMessage(key);
  };

  return {
    init: init,
    get: get,
  };
})();

const headerComponent = (function() {
  const showVersion = function() {
    $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
  };

  const initEventHandlers = function() {
    $('#js_button_add_pattern').on('click', function(e) {
      e.preventDefault();
      patternForm.show('add', {});
    });

    $('#js_button_export').on('click', function(e) {
      e.preventDefault();
      exportForm.show();
    });

    $('#js_button_import').on('click', function(e) {
      e.preventDefault();
      importForm.show(function() {
        patternListComponent.show();
      })
    });
  };

  return {
    init: function() {
      initEventHandlers();
      showVersion();
    },
  };
})();

const patternListComponent = (function() {
  const show = function() {
    const headerArea = $('#js_list_pattern thead');
    const listArea = $('#js_list_pattern tbody');
    const sorted = urlNotification.data.sortByMessage(urlNotification.storage.getAll());

    $('#js_pattern_list_badge').text(sorted.length);

    headerArea.empty();
    listArea.empty();

    if (sorted.length > 0) {
      makeHeader().appendTo(headerArea);
    }

    sorted.forEach(function(item) {
      makeRow(item).appendTo(listArea);
    });
  };

  const makeHeader = (function() {
    const row = function() {
      return $('<tr>');
    };

    const column = function(value) {
      return $('<th>').text(value);
    };

    return function() {
      return row()
        .append(column(i18n.get('label_url_pattern')))
        .append(column(i18n.get('label_message')))
        .append(column(i18n.get('label_display_position')))
        .append(column(i18n.get('label_enabled')))
        .append(column(i18n.get('label_operation')));
    };
  })();

  const makeRow = (function() {
    const row = function() {
      return $('<tr>');
    };

    const column = function() {
      return $('<td>');
    };

    /**
     * @param {PatternItem} item
     */
    const patternColumn = function(item) {
      return column().text(item.url);
    };

    const messageColumn = (function() {
      /**
       * @param {PatternItem} item
       */
      const message = function(item) {
        return $('<div>')
          .addClass('list-message')
          .css(messageCss(item))
          .text(item.msg);
      };

      /**
       * @param {PatternItem} item
       */
      const messageCss = function(item) {
        return {
          'background-color': '#' + item.backgroundColor,
          'color': '#' + urlNotification.config.defaultFontColor(),
        };
      };

      /**
       * @param {PatternItem} item
       */
      return function(item) {
        return column().append(message(item));
      };
    })();

    const displayPositionColumn = (function() {
      /**
       * @param {PatternItem} item
       */
      const message = function(item) {
        switch (item.displayPosition) {
          case 'top': return i18n.get('label_top');
          case 'bottom': return i18n.get('label_bottom');
          default: return '';
        }
      };

      /**
       * @param {PatternItem} item
       */
      return function(item) {
        return column().text(message(item));
      };
    })();

    const statusColumn = (function() {
      /**
       * @param {PatternItem} item
       */
      const message = function(item) {
        return item.status === 1 ? 'Y': 'n';
      };

      /**
       * @param {PatternItem} item
       */
      return function(item) {
        return column().text(message(item));
      };
    })();

    const actionColumn = (function() {
      const button = function(className, text) {
        return $('<button>')
          .addClass('btn btn-sm')
          .addClass(className)
          .text(text);
      };

      /**
       * @param {PatternItem} item
       */
      const copyButton = function(item) {
        return button('btn-default', i18n.get('label_copy'))
          .on('click', function(e) {
            e.preventDefault();
            patternForm.show('add', {
              url: item.url,
              message: item.msg,
              backgroundColor: item.backgroundColor,
              displayPosition: item.displayPosition,
              status: item.status,
            });
          });
      };

      /**
       * @param {PatternItem} item
       */
      const editButton = function(item) {
        return button('btn-primary', i18n.get('label_edit'))
          .on('click', function(e) {
            e.preventDefault();
            patternForm.show('edit', {
              url: item.url,
              message: item.msg,
              backgroundColor: item.backgroundColor,
              displayPosition: item.displayPosition,
              status: item.status,
            });
          });
      };

      /**
       * @param {PatternItem} item
       */
      const deleteButton = function(item) {
        return button('btn-danger', i18n.get('label_delete'))
          .on('click', function(e) {
            e.preventDefault();
            deleteForm.show({
              pattern: item.url,
              message: item.msg,
            }, function () {
              show();
            });
          });
      };

      /**
       * @param {PatternItem} item
       */
      return function(item) {
        return column()
          .addClass('action')
          .append(copyButton(item))
          .append(editButton(item))
          .append(deleteButton(item));
      }
    })();

    /**
     * @param {PatternItem} item
     */
    return function(item) {
      return row()
        .append(patternColumn(item))
        .append(messageColumn(item))
        .append(displayPositionColumn(item))
        .append(statusColumn(item))
        .append(actionColumn(item));
    };
  })();

  return {
    show: show,
  };
})();

/**
 * @typedef {object} FormValue
 * @property {string} url
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} displayPosition
 * @property {number} status
 */

const patternForm = (function() {

  let modal;

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

  const init = function() {
    modal = modalFactory.init('#js_modal_pattern', {
      'shown.bs.modal': function() {
        $('#js_input_url').trigger('focus');
      },
    });

    $('#js_colorpicker').colorpicker({
      align: 'left',
      format: 'hex',
    });

    util.rebind('#js_input_clear', 'click', function(e) {
      e.preventDefault();
      clear();
    });

    util.rebind('#js_form_pattern', 'submit', function(e) {
      e.preventDefault();
      submit();
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
        usable = urlNotification.storage.findByUrl(value) === null;
      }

      if (mode === 'edit') {
        usable = original.url === value || urlNotification.storage.findByUrl(value) === null;
      }

      return this.optional(element) || usable;
    }, 'Existing URL.');
  };

  /**
   * @returns {FormValue}
   */
  const defaultValues = function() {
    return {
      url: '',
      message: '',
      backgroundColor: urlNotification.config.defaultBackgroundColor(),
      displayPosition: urlNotification.config.defaultDisplayPosition(),
      status: urlNotification.config.defaultStatus(),
    };
  };

  const bindValues = function() {
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

  /**
   * @param {string} argMode 'add' or 'edit'
   * @param {FormValue} argOriginal
   */
  const show = function(argMode, argOriginal) {
    mode = argMode;
    original = argOriginal;

    current = $.extend(defaultValues(), original);

    resetValidator();
    bindValues();
    modal.show();
  };

  const clear = function() {
    current = defaultValues();

    resetValidator();
    bindValues();
  };

  const submit = (function() {
    const trimValue = function(selector) {
      return $(selector).val().trim();
    };

    const validatorConfig = {
      rules: {
        url: {
          required: true,
          existingUrl: true,
        },
        message: {
          required:true,
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
      errorPlacement: function(error, element) {
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

    return function() {
      validator = $('#js_form_pattern').validate(validatorConfig);

      if (validator.form() === false) {
        return;
      }

      const saveData = {
        url: trimValue('#js_input_url'),
        msg: trimValue('#js_input_msg'),
        backgroundColor: trimValue('#js_input_background_color').replace(/^#/, ''),
        displayPosition: trimValue('input[name=display_position]:checked'),
        status: $('#js_input_status').is(':checked') ? 1 : 0,
      };

      if (mode === 'add') {
        urlNotification.storage.addPattern(saveData);
      }

      if (mode === 'edit') {
        urlNotification.storage.updatePattern(original.url, saveData);
      }

      modal.hide();
      patternListComponent.show();
    };
  })();

  return {
    init: init,
    show: show,
  };
})();

$(function() {
  headerComponent.init();
  patternListComponent.show();
  patternForm.init();

  i18n.init();
});
