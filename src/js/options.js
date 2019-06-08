var util = (function() {
  var rebind = function(selector, eventName, callback) {
    $(selector).off(eventName).on(eventName, callback);
  };

  var modal = function(selector, events) {
    $.each($.extend({}, events), function(eventName, callback) {
      $(selector).on(eventName, callback);
    });

    var show = function() {
      $(selector).modal('show');
    };

    var hide = function() {
      $(selector).modal('hide');
    };

    return {
      show: show,
      hide: hide,
    };
  };

  var buildMessage = function(selector) {
    var timeoutId = null;

    var show = function(message) {
      $(selector).text(message);

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(function() {
        timeoutId = null;
        hide();
      }, 3000);
    };

    var hide = function() {
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

var i18n = (function() {
  var init = function() {
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
  var get = function(key) {
    return chrome.i18n.getMessage(key);
  };

  return {
    init: init,
    get: get,
  };
})();

var headerComponent = (function() {
  var showVersion = function() {
    $('#js_version').text('Ver. ' + chrome.runtime.getManifest().version);
  };

  var initEventHandlers = function() {
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

var exportComponent = (function() {
  var modal;

  /**
   * @type {ExportFormItem}
   */
  var current;

  var init = function() {
    var clipboard = new ClipboardJS('#js_export_copy');
    var message = util.buildMessage('#js_export_message');

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

  var bindValues = function() {
    $('#js_export_display').html(current.jsonString);
  };

  var show = function() {
    var data = {
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

var importComponent = (function() {
  var modal = null;

  var init = function() {
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

  var show = function() {
    clear();
    modal.show();
  };

  var clear = function() {
    $('#js_form_import_json').val('');
  };

  var submit = (function() {
    var error = {
      required: i18n.get('message_json_required'),
      invalidJson: i18n.get('message_json_invalid'),
    };

    var message = util.buildMessage('#js_import_message');

    return function() {
      var jsonText = $('#js_form_import_json').val().trim();

      if (jsonText.length === 0) {
        message.show(error.required);

        return;
      }

      var json;

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

var patternListComponent = (function() {
  var show = function() {
    var listArea = $('#js_list_pattern tbody');
    var sorted = urlNotification.data.sortByMessage(urlNotification.storage.getAll());

    $('#js_pattern_list_badge').text(sorted.length);

    listArea.empty();
    $.each(sorted, function(idx, item) {
      makeRow(item).appendTo(listArea);
    });
  };

  var makeRow = (function() {
    var row = function() {
      return $('<tr>');
    };

    var column = function() {
      return $('<td>');
    };

    var button = function(clazz, text) {
      return $('<button>').
        addClass('btn btn-sm').
        addClass(clazz).
        text(text);
    };

    /**
     * @param {PatternItem} item
     */
    var listMessage = function(item) {
      return $('<div>').
        addClass('list-message').
        css(listMessageCss(item)).
        text(item.msg);
    };

    /**
     * @param {PatternItem} item
     */
    var listMessageCss = function(item) {
      return {
        'background-color': '#' + item.backgroundColor,
        'color': '#ffffff',
      };
    };

    /**
     * @param {PatternItem} item
     */
    var patternColumn = function(item) {
      return column().text(item.url);
    };

    /**
     * @param {PatternItem} item
     */
    var messgeColumn = function(item) {
      return column().append(listMessage(item));
    };

    /**
     * @param {PatternItem} item
     */
    var actionColumn = function(item) {
      return column().addClass('action').
        append(copyButton(item)).
        append(editButton(item)).
        append(deleteButton(item));
    };

    /**
     * @param {PatternItem} item
     */
    var copyButton = function(item) {
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
    var editButton = function(item) {
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
    var deleteButton = function(item) {
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
        append(messgeColumn(item)).
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

var patternForm = (function() {

  /**
   * @type {FormValue}
   */
  var current;

  var init = function() {
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
      var usable = true;

      if (mode === 'add') {
        usable = urlNotification.storage.findByUrl(value) === null;
      }

      if (mode === 'edit') {
        usable = original.url === value || urlNotification.storage.findByUrl(value) === null;
      }

      return this.optional(element) || usable;
    }, 'Existing URL.');
  };

  var defaultValues = function() {
    return {
      url: '',
      message: '',
      backgroundColor: urlNotification.config.defaultBackgroundColor(),
      displayPosition: urlNotification.config.defaultDisplayPosition(),
    };
  };

  var mode = null;

  var original = null;

  var bindValues = function() {
    $('#js_input_url').val(current.url);
    $('#js_input_msg').val(current.message);
    $('#js_input_backgroundcolor').val('#' + current.backgroundColor);
    $('#js_colorpicker').colorpicker('setValue', '#' + current.backgroundColor);
    $('input[name=display_position]').val([current.displayPosition]);
  };

  var modal = null;

  var validator = null;

  var resetValidator = function() {
    if (validator) {
      validator.destroy();
    }
  };

  /**
   * @param {string} argMode 'add' or 'edit'
   * @param {FormValue} argOriginal
   */
  var show = function(argMode, argOriginal) {
    mode = argMode;
    original = argOriginal;

    current = $.extend(defaultValues(), original);

    resetValidator();
    bindValues();
    modal.show();
  };

  var clear = function() {
    current = defaultValues();

    resetValidator();
    bindValues();
  };

  var submit = (function() {
    var trimValue = function(selector) {
      return $(selector).val().trim();
    };

    var validatorConfig = {
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
      errorClass: 'has-error',
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

    var end = function() {
      modal.hide();
      patternListComponent.show();
    };

    return function() {
      var url = trimValue('#js_input_url');
      var msg = trimValue('#js_input_msg');
      var backgroundColor = trimValue('#js_input_backgroundcolor');
      var displayPosition = trimValue('input[name=display_position]:checked');

      validator = $("#js_form_pattern").validate(validatorConfig);

      if (validator.form() === false) {
        return;
      }

      var saveData = {
        url: url,
        msg: msg,
        backgroundColor: backgroundColor.replace(/^#/, ''),
        displayPosition: displayPosition,
      };

      if (mode === 'add') {
        urlNotification.storage.addPattern(saveData);
        end();
      }

      if (mode === 'edit') {
        urlNotification.storage.updatePattern(original.url, saveData);
        end();
      }
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

var deleteForm = (function() {
  var modal;

  /**
   * @param {DeleteFormItem}
   */
  var current;

  var init = function() {
    modal = util.modal('#js_modal_delete');

    util.rebind('#js_form_delete', 'submit', function(e) {
      e.preventDefault();
      submit();
    });
  };

  /**
   * @param {DeleteFormItem} item
   */
  var show = function(item) {
    current = item;

    bindValues();
    modal.show();
  };

  var bindValues = function() {
    $('#js_form_delete_pattern').text(current.pattern);
    $('#js_form_delete_message').text(current.message);
  };

  var submit = function() {
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
