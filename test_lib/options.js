const fs = require('fs');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const storage = require('./storage');

const before = function () {
  global.chrome = chrome;
};

const beforeEach = function () {
  storage.clearStorage();

  const localeFile = __dirname + '/../src/_locales/en/messages.json';
  const message = fs.readFileSync(localeFile).toString();
  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));

  chrome.flush();

  delete require.cache[require.resolve('jquery')];
  delete require.cache[require.resolve('jquery-validation')];
  delete require.cache[require.resolve('bootstrap')];
  delete require.cache[require.resolve('bootstrap/js/modal')];
  delete require.cache[require.resolve('bootstrap-colorpicker')];
};

const afterEach = function() {
  delete global.window;
  delete global.document;
  delete global.HTMLElement;
};

const after = function () {
  delete global.chrome;
};

/**
 * @param {string} content
 * @param {Object} [options]
 */
const initDom = function (content, options) {
  const dom = new JSDOM(content, options);

  global.window = dom.window;
  global.document = dom.window.document;

  // clipboard checks constructor argument is instance of HTMLElement or not.
  // We have to expose to global.
  global.HTMLElement = dom.window.HTMLElement;
};

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
  };
};

module.exports.before = before;
module.exports.beforeEach = beforeEach;
module.exports.afterEach = afterEach;
module.exports.after = after;
module.exports.initDom = initDom;

module.exports.exportForm = exportForm;
module.exports.importForm = importForm;
module.exports.list = list;
module.exports.patternForm = patternForm;
module.exports.deleteForm = deleteForm;
