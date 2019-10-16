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

  chrome.runtime.getManifest
    .returns({
      version: '1.2.3',
    });

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

module.exports.before = before;
module.exports.beforeEach = beforeEach;
module.exports.afterEach = afterEach;
module.exports.after = after;
module.exports.initDom = initDom;
