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

var exportComponent = (function() {
  var modal = null;

  var init = function() {
    var clipboard = new ClipboardJS('#js_export_copy');
    var message = util.buildMessage('#js_export_message');

    clipboard.on('success', function(e) {
      e.clearSelection();
      message.show('コピーしました。');
    });

    modal = util.modal('#js_modal_export', {
      'shown.bs.modal': function() {
        $('#js_export_display').scrollTop(0);
      },
    });
  };

  var bindValues = function(values) {
    $('#js_export_display').html(values.jsonString);
  };

  var show = function() {
    var data = {
      version: urlNotification.config.version(),
      pattern: urlNotification.data.sortByMessage(urlNotification.storage.getAll()),
    };
    var jsonString = JSON.stringify(data, null, 4);

    bindValues({ jsonString: jsonString });

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
  };

  var show = function() {
    clear();

    util.rebind('#js_form_import', 'submit', function(e) {
      e.preventDefault();
      submit();
    });

    modal.show();
  };

  var clear = function() {
    $('#js_form_import_json').val('');
  };

  var submit = (function() {
    var error = {
      required: 'フォームが未入力です。',
      invalidJson: 'JSONテキストが正しくありません。',
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
      return button('btn-default', 'コピー').click(function(e) {
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
      return button('btn-primary', '編集').click(function(e) {
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
      return button('btn-danger', '削除').click(function(e) {
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

  var bindValues = function(formValues) {
    $('#js_input_url').val(formValues.url);
    $('#js_input_msg').val(formValues.message);
    $('#js_input_backgroundcolor').val('#' + formValues.backgroundColor);
    $('#js_colorpicker').colorpicker('setValue', '#' + formValues.backgroundColor);
    $('input[name=display_position]').val([formValues.displayPosition]);
  };

  var modal = null;

  /**
   * @param {string} argMode 'add' or 'edit'
   * @param {FormValue} argOriginal
   */
  var show = function(argMode, argOriginal) {
    mode = argMode;
    original = argOriginal;

    bindValues($.extend(defaultValues(), original));

    util.rebind('#js_input_clear', 'click', function(e) {
      e.preventDefault();
      clear();
    });

    util.rebind('#js_form_pattern', 'submit', function(e) {
      e.preventDefault();
      submit();
    });

    modal.show();
  };

  var clear = function() {
    bindValues(defaultValues());
  };

  var submit = (function() {
    var error = {
      required: '未入力の項目があります。',
      duplicated: '入力されたURLパターンは既に登録されています。',
    };

    var trimValue = function(selector) {
      return $(selector).val().trim();
    };

    var message = util.buildMessage('#js_pattern_message');

    var end = function() {
      modal.hide();
      patternListComponent.show();
    };

    return function() {
      var url = trimValue('#js_input_url');
      var msg = trimValue('#js_input_msg');
      var backgroundColor = trimValue('#js_input_backgroundcolor');
      var displayPosition = trimValue('input[name=display_position]:checked');

      if (url === '' || msg === '' || backgroundColor === '' || displayPosition === '') {
        message.show(error.required);
        return;
      }

      var saveData = {
        url: url,
        msg: msg,
        backgroundColor: backgroundColor.replace(/^#/, ''),
        displayPosition: displayPosition,
      };

      if (mode === 'add') {
        if (urlNotification.storage.findByUrl(url)) {
          message.show(error.duplicated);
          return;
        }

        urlNotification.storage.addPattern(saveData);
        end();
      }

      if (mode === 'edit') {
        if (original.url !== url && urlNotification.storage.findByUrl(url)) {
          message.show(error.duplicated);
          return;
        }

        urlNotification.storage.updatePattern(original.url, saveData);
        end();
      }
    };
  })();

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
  };

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
  var current = null;

  /**
   * @param {DeleteFormItem} item
   */
  var bindValues = function(item) {
    $('#js_form_delete_pattern').text(item.pattern);
    $('#js_form_delete_message').text(item.message);
  };

  var modal = null;

  /**
   * @param {DeleteFormItem} item
   */
  var show = function(item) {
    current = item;

    bindValues(current);

    util.rebind('#js_form_delete', 'submit', function(e) {
      e.preventDefault();
      submit();
    });

    modal.show();
  };

  var submit = function() {
    urlNotification.storage.deletePattern(current.pattern);
    modal.hide();
    patternListComponent.show();
  };

  var init = function() {
    modal = util.modal('#js_modal_delete');
  };

  return {
    init: init,
    show: show,
  };
})();

$(function() {
  $.validator.addMethod('hexColor', function(value, element) {
    return this.optional(element) || /^[0-9a-f]{6}$/i.test(value);
  });

  headerComponent.init();
  exportComponent.init();
  importComponent.init();
  patternListComponent.show();
  patternForm.init();
  deleteForm.init();
});
