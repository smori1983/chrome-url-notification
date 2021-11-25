const sprintf = require('sprintf-js').sprintf;
const Config = require('../notification/config');
const Storage = require('../notification/storage');
const i18n = require('./i18n');
const patternForm = require('./options.pattern-form');
const deleteForm = require('./options.delete-form');

const config = new Config();
const storage = new Storage();

/**
 * @param {jQuery} $
 */
const initEventHandler = ($) => {
  const $table = $('#js_list_pattern');

  $table.on('click', (e) => {
    const $element = $(e.target);
    if ($element.data('un-action') === 'pattern-item-copy') {
      e.preventDefault();
      $(e.target).trigger('blur');
      patternForm.show($, 'add', $element.data('un-pattern-item'), () => {
        refresh($);
      });
    }
  });

  $table.on('click', (e) => {
    const $element = $(e.target);
    if ($element.data('un-action') === 'pattern-item-edit') {
      e.preventDefault();
      $(e.target).trigger('blur');
      patternForm.show($, 'edit', $element.data('un-pattern-item'), () => {
        refresh($);
      });
    }
  });

  $table.on('click', (e) => {
    const $element = $(e.target);
    if ($element.data('un-action') === 'pattern-item-delete') {
      e.preventDefault();
      $(e.target).trigger('blur');
      deleteForm.show($, $element.data('un-pattern-item'), () => {
        refresh($);
      });
    }
  });

  $('#js_list_pattern_reload').on('click', (e) => {
    e.preventDefault();
    refresh($);
  });
};

/**
 * @param {jQuery} $
 */
const show = ($) => {
  initEventHandler($);
  draw($);
};

/**
 * @param {jQuery} $
 */
const refresh = ($) => {
  draw($);
};

/**
 * @param {jQuery} $
 */
const draw = ($) => {
  const collection = storage.getCollection().sortByMessage();

  drawBadge($, collection);
  drawTable($, collection);
};

/**
 * @param {jQuery} $
 * @param {PatternCollection} collection
 */
const drawBadge = ($, collection) => {
  $('#js_pattern_list_badge').text(collection.count());
};

/**
 * @param {jQuery} $
 * @param {PatternCollection} collection
 */
const drawTable = ($, collection) => {
  const $headerArea = $('#js_list_pattern thead');
  const $listArea = $('#js_list_pattern tbody');

  $headerArea.empty();
  $listArea.empty();

  if (collection.count() > 0) {
    makeHeader($).appendTo($headerArea);
    collection.get().forEach((item) => {
      makeRow($, item).appendTo($listArea);
    });
  }
};

/**
 * @param {jQuery} $
 */
const makeHeader = ($) => {
  const row = () => {
    return $('<tr>');
  };

  const column = (value) => {
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
 * @param {jQuery} $
 * @param {PatternItem} item
 */
const makeRow = ($, item) => {
  const row = () => {
    return $('<tr>');
  };

  const column = () => {
    return $('<td>');
  };

  /**
   * @param {string} label
   * @param {string} className
   * @returns {JQuery}
   */
  const container = (label, className) => {
    return $('<span>')
      .addClass('align-middle')
      .addClass(className)
      .text(label);
  };

  const columnPattern = (() => {
    /**
     * @param {PatternItem} item
     */
    return (item) => {
      return column().append(container(item.url, 'pattern'));
    };
  })();

  const columnMessage = (() => {
    /**
     * @param {PatternItem} item
     */
    const css = (item) => {
      return {
        'background-color': '#' + item.backgroundColor,
        'color': '#' + config.defaultFontColor(),
      };
    };

    /**
     * @param {PatternItem} item
     */
    return (item) => {
      return column().append(container(item.msg, 'list-message d-block p-1 rounded text-center').css(css(item)));
    };
  })();

  const columnDisplayPosition = (() => {
    /**
     * @param {PatternItem} item
     */
    const message = (item) => {
      switch (item.displayPosition) {
        case 'top': return i18n.get('label_top');
        case 'bottom': return i18n.get('label_bottom');
        case 'top_left': return i18n.get('label_top_left');
        case 'top_right': return i18n.get('label_top_right');
        case 'bottom_left': return i18n.get('label_bottom_left');
        case 'bottom_right': return i18n.get('label_bottom_right');
        default: return '';
      }
    };

    /**
     * @param {PatternItem} item
     */
    return (item) => {
      return column().append(container(message(item), 'display_position'));
    };
  })();

  const columnStatus = (() => {
    /**
     * @param {PatternItem} item
     */
    const message = (item) => {
      switch (item.status) {
        case 1: return 'Y';
        case 0: return 'n';
        default: return '';
      }
    };

    /**
     * @param {PatternItem} item
     */
    return (item) => {
      return column().append(container(message(item), 'status'));
    };
  })();

  const columnAction = (() => {
    /**
     * @param {string} label
     * @param {string} action
     * @param {PatternItem} item
     * @param {string} className
     * @returns {JQuery}
     */
    const button = (label, action, item, className) => {
      return $('<button>')
        .addClass(sprintf('mr-1 btn btn-sm %s_button', action))
        .addClass(className)
        .attr('data-un-action', sprintf('pattern-item-%s', action))
        .attr('data-un-pattern-item', JSON.stringify(item))
        .text(label);
    };

    /**
     * @param {PatternItem} item
     */
    const buttonCopy = (item) => {
      return button(i18n.get('label_copy'), 'copy', item, 'btn-success');
    };

    /**
     * @param {PatternItem} item
     */
    const buttonEdit = (item) => {
      return button(i18n.get('label_edit'), 'edit', item, 'btn-primary');
    };

    /**
     * @param {PatternItem} item
     */
    const buttonDelete = (item) => {
      return button(i18n.get('label_delete'), 'delete', item, 'btn-danger');
    };

    /**
     * @param {PatternItem} item
     */
    return (item) => {
      return column()
        .addClass('action')
        .append(buttonCopy(item))
        .append(buttonEdit(item))
        .append(buttonDelete(item));
    }
  })();

  return row()
    .append(columnPattern(item))
    .append(columnMessage(item))
    .append(columnDisplayPosition(item))
    .append(columnStatus(item))
    .append(columnAction(item));
};

module.exports.show = show;
module.exports.refresh = refresh;
