'use strict';

const urlNotification = require('url-notification');

const util = (function() {
  const rebind = function(selector, eventName, callback) {
    $(selector).off(eventName).on(eventName, callback);
  };

  const modal = function(selector, events) {
    $.each($.extend({}, events), function(eventName, callback) {
      $(selector).on(eventName, callback);
    });

    const show = function() {
      $(selector).modal('show');
    };

    const hide = function() {
      $(selector).modal('hide');
    };

    return {
      show: show,
      hide: hide,
    };
  };

  const buildMessage = function(selector) {
    let timeoutId = null;

    const show = function(message) {
      $(selector).text(message);

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(function() {
        timeoutId = null;
        hide();
      }, 3000);
    };

    const hide = function() {
      $(selector).empty();
    };

    return {
      show: show,
      hide: hide,
    };
  };

  return {
    rebind: rebind,
    modal: modal,
    buildMessage: buildMessage,
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
    $('#js_button_add_pattern').click(function(e) {
      e.preventDefault();
      patternForm.show('add', {});
    });

    $('#js_button_export').click(function(e) {
      e.preventDefault();
      exportComponent.show();
    });

    $('#js_button_import').click(function(e) {
      e.preventDefault();
      importComponent.show();
    });
  };

  return {
    init: function() {
      initEventHandlers();
      showVersion();
    },
  };
})();

/**
 * @typedef {object} ExportFormItem
 * @property {string} jsonString
 */

const exportComponent = (function() {
  let modal;

  /**
   * @type {ExportFormItem}
   */
  let current;

  const init = function() {
    const clipboard = new ClipboardJS('#js_export_copy');
    const message = util.buildMessage('#js_export_message');

    clipboard.on('success', function(e) {
      e.clearSelection();
      message.show(i18n.get('message_copy_done'));
    });

    modal = util.modal('#js_modal_export', {
      'shown.bs.modal': function() {
        $('#js_export_display').scrollTop(0);
      },
    });
  };

  const bindValues = function() {
    $('#js_export_display').html(current.jsonString);
  };

  const show = function() {
    const data = {
      version: urlNotification.config.version(),
      pattern: urlNotification.data.sortByMessage(urlNotification.storage.getAll()),
    };

    current = {
      jsonString: JSON.stringify(data, null, 4),
    };

    bindValues();
    modal.show();
  };

  return {
    init: init,
    show: show,
  };
})();

const importComponent = (function() {
  let modal = null;

  const init = function() {
    modal = util.modal('#js_modal_import', {
      'shown.bs.modal': function() {
        $('#js_form_import_json').focus();
      },
    });

    util.rebind('#js_form_import', 'submit', function(e) {
      e.preventDefault();
      submit();
    });
  };

  const show = function() {
    clear();
    modal.show();
  };

  const clear = function() {
    $('#js_form_import_json').val('');
  };

  const submit = (function() {
    const error = {
      required: i18n.get('message_json_required'),
      invalidJson: i18n.get('message_json_invalid'),
    };

    const message = util.buildMessage('#js_import_message');

    return function() {
      const jsonText = $('#js_form_import_json').val().trim();

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

      if (urlNotification.validator.forImportJson(json) === false) {
        message.show(error.invalidJson);

        return;
      }

      urlNotification.importer.importJson(json);

      modal.hide();
      patternListComponent.show();
    };
  })();

  return {
    init: init,
    show: show,
  };
})();

const patternListComponent = (function() {
  const show = function() {
    const headerArea = $('#js_list_pattern thead');
    const listArea = $('#js_list_pattern tbody');
    const sorted = urlNotification.data.sortByMessage(urlNotification.storage.getAll());

    $('#js_pattern_list_badge').text(sorted.length);

    headerArea.empty();
    if (sorted.length > 0) {
      makeHeader().appendTo(headerArea);
    }

    listArea.empty();
    $.each(sorted, function(idx, item) {
      makeRow(item).appendTo(listArea);
    });
  };

  const makeHeader = function() {
    const row = function() {
      return $('<tr>');
    };

    const column = function(value) {
      return $('<th>').text(value);
    };

    return row()
      .append(column(i18n.get('label_url_pattern')))
      .append(column(i18n.get('label_message')))
      .append(column(i18n.get('label_operation')));
  };

  const makeRow = (function() {
    const row = function() {
      return $('<tr>');
    };

    const column = function() {
      return $('<td>');
    };

    const button = function(clazz, text) {
      return $('<button>').
        addClass('btn btn-sm').
        addClass(clazz).
        text(text);
    };

    /**
     * @param {PatternItem} item
     */
    const listMessage = function(item) {
      return $('<div>').
        addClass('list-message').
        css(listMessageCss(item)).
        text(item.msg);
    };

    /**
     * @param {PatternItem} item
     */
    const listMessageCss = function(item) {
      return {
        'background-color': '#' + item.backgroundColor,
        'color': '#ffffff',
      };
    };

    /**
     * @param {PatternItem} item
     */
    const patternColumn = function(item) {
      return column().text(item.url);
    };

    /**
     * @param {PatternItem} item
     */
    const messageColumn = function(item) {
      return column().append(listMessage(item));
    };

    /**
     * @param {PatternItem} item
     */
    const actionColumn = function(item) {
      return column().addClass('action').
        append(copyButton(item)).
        append(editButton(item)).
        append(deleteButton(item));
    };

    /**
     * @param {PatternItem} item
     */
    const copyButton = function(item) {
      return button('btn-default', i18n.get('label_copy')).click(function(e) {
        e.preventDefault();
        patternForm.show('add', {
          url: item.url,
          message: item.msg,
          backgroundColor: item.backgroundColor,
          displayPosition: item.displayPosition,
        });
      });
    };

    /**
     * @param {PatternItem} item
     */
    const editButton = function(item) {
      return button('btn-primary', i18n.get('label_edit')).click(function(e) {
        e.preventDefault();
        patternForm.show('edit', {
          url: item.url,
          message: item.msg,
          backgroundColor: item.backgroundColor,
          displayPosition: item.displayPosition,
        });
      });
    };

    /**
     * @param {PatternItem} item
     */
    const deleteButton = function(item) {
      return button('btn-danger', i18n.get('label_delete')).click(function(e) {
        e.preventDefault();
        deleteForm.show({
          pattern: item.url,
          message: item.msg,
        });
      });
    };

    /**
     * @param {PatternItem} item
     */
    return function(item) {
      return row().
        append(patternColumn(item)).
        append(messageColumn(item)).
        append(actionColumn(item));
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
    modal = util.modal('#js_modal_pattern', {
      'shown.bs.modal': function() {
        $('#js_input_url').focus();
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
    };
  };

  const bindValues = function() {
    $('#js_input_url').val(current.url);
    $('#js_input_msg').val(current.message);
    $('#js_input_backgroundcolor').val('#' + current.backgroundColor);
    $('#js_colorpicker').colorpicker('setValue', '#' + current.backgroundColor);
    $('input[name=display_position]').val([current.displayPosition]);
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

/**
 * @typedef {object} DeleteFormItem
 * @property {string} pattern
 * @property {string} message
 */

const deleteForm = (function() {
  let modal;

  /**
   * @param {DeleteFormItem}
   */
  let current;

  const init = function() {
    modal = util.modal('#js_modal_delete');

    util.rebind('#js_form_delete', 'submit', function(e) {
      e.preventDefault();
      submit();
    });
  };

  /**
   * @param {DeleteFormItem} item
   */
  const show = function(item) {
    current = item;

    bindValues();
    modal.show();
  };

  const bindValues = function() {
    $('#js_form_delete_pattern').text(current.pattern);
    $('#js_form_delete_message').text(current.message);
  };

  const submit = function() {
    urlNotification.storage.deletePattern(current.pattern);
    modal.hide();
    patternListComponent.show();
  };

  return {
    init: init,
    show: show,
  };
})();

$(function() {
  headerComponent.init();
  exportComponent.init();
  importComponent.init();
  patternListComponent.show();
  patternForm.init();
  deleteForm.init();

  i18n.init();
});
