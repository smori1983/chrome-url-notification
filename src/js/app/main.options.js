'use strict';

const $ = global.jQuery = require('jquery');
require('jquery-validation');
require('bootstrap');
require('bootstrap-colorpicker');

const urlNotification = require('./../urlNotification/main');

const exportForm = require('./options.exportForm');
const importForm = require('./options.importForm');
const deleteForm = require('./options.deleteForm');
const patternForm = require('./options.patternForm');

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
      patternForm.show('add', {}, function () {
        patternListComponent.show();
      });
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
            }, function () {
              patternListComponent.show();
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
            }, function () {
              patternListComponent.show();
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

$(function() {
  headerComponent.init();
  patternListComponent.show();

  i18n.init();
});
