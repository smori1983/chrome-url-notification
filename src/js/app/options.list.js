const i18n = require('./i18n');
const config = require('../urlNotification/config');
const data = require('../urlNotification/data');
const storage = require('../urlNotification/storage');
const patternForm = require('./options.patternForm');
const deleteForm = require('./options.deleteForm');

const show = function () {
  const $ = require('jquery');
  const $headerArea = $('#js_list_pattern thead');
  const $listArea = $('#js_list_pattern tbody');

  const sorted = data.sortByMessage(storage.getAll());

  $('#js_pattern_list_badge').text(sorted.length);

  $headerArea.empty();
  $listArea.empty();

  if (sorted.length > 0) {
    makeHeader().appendTo($headerArea);
  }

  sorted.forEach(function(item) {
    makeRow(item).appendTo($listArea);
  });
};

const makeHeader = function() {
  const $ = require('jquery');

  const row = function() {
    return $('<tr>');
  };

  const column = function(value) {
    return $('<th>').text(value);
  };

  return row()
    .append(column(i18n.get('label_url_pattern')))
    .append(column(i18n.get('label_message')))
    .append(column(i18n.get('label_display_position')))
    .append(column(i18n.get('label_enabled')))
    .append(column(i18n.get('label_operation')));
};

/**
 * @param {PatternItem} item
 */
const makeRow = function(item) {
  const $ = require('jquery');

  const row = function() {
    return $('<tr>');
  };

  const column = function() {
    return $('<td>');
  };

  const patternColumn = (function(item) {
    /**
     * @param {PatternItem} item
     */
    const container = function(item) {
      return $('<div>')
        .addClass('pattern')
        .text(item.url);
    };

    /**
     * @param {PatternItem} item
     */
    return function (item) {
      return column().append(container(item));
    };
  })();

  const messageColumn = (function() {
    /**
     * @param {PatternItem} item
     */
    const container = function(item) {
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
        'color': '#' + config.defaultFontColor(),
      };
    };

    /**
     * @param {PatternItem} item
     */
    return function(item) {
      return column().append(container(item));
    };
  })();

  const displayPositionColumn = (function() {
    /**
     * @param {PatternItem} item
     */
    const container = function(item) {
      return $('<div>')
        .addClass('display_position')
        .text(message(item));
    };

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
      return column().append(container(item));
    };
  })();

  const statusColumn = (function() {
    /**
     * @param {PatternItem} item
     */
    const container = function(item) {
      return $('<div>')
        .addClass('status')
        .text(message(item));
    };

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
      return column().append(container(item));
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
        .addClass('copy_button')
        .on('click', function(e) {
          e.preventDefault();
          patternForm.show('add', {
            url: item.url,
            message: item.msg,
            backgroundColor: item.backgroundColor,
            displayPosition: item.displayPosition,
            status: item.status,
          }, function () {
            show();
          });
        });
    };

    /**
     * @param {PatternItem} item
     */
    const editButton = function(item) {
      return button('btn-primary', i18n.get('label_edit'))
        .addClass('edit_button')
        .on('click', function(e) {
          e.preventDefault();
          patternForm.show('edit', {
            url: item.url,
            message: item.msg,
            backgroundColor: item.backgroundColor,
            displayPosition: item.displayPosition,
            status: item.status,
          }, function () {
            show();
          });
        });
    };

    /**
     * @param {PatternItem} item
     */
    const deleteButton = function(item) {
      return button('btn-danger', i18n.get('label_delete'))
        .addClass('delete_button')
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

  return row()
    .append(patternColumn(item))
    .append(messageColumn(item))
    .append(displayPositionColumn(item))
    .append(statusColumn(item))
    .append(actionColumn(item));
};

module.exports.show = show;
