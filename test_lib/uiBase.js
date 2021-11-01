const fs = require('fs');
const { before, beforeEach, after, afterEach } = require('mocha');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const storage = require('./storage');

/**
 * @param {string} locale 'en' or 'ja'
 */
const initI18n = (locale) => {
  return () => {
    const localeFile = __dirname + '/../src/_locales/' + locale + '/messages.json';
    const message = fs.readFileSync(localeFile).toString();
    chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
  };
};

/**
 * @param {string} content
 * @param {Object} [options]
 */
const initDom = (content, options) => {
  const dom = new JSDOM(content, options);

  global.window = dom.window;
  global.document = dom.window.document;

  // clipboard checks constructor argument is instance of HTMLElement or not.
  // We have to expose to global.
  global.HTMLElement = dom.window.HTMLElement;
};

/**
 * @param {string} content
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initDom2 = (content, options) => {
  return new JSDOM(content, options);
};

const registerHooks = () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    storage.clear();

    chrome.flush();

    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });

    delete require.cache[require.resolve('jquery')];
    delete require.cache[require.resolve('jquery-validation')];
    delete require.cache[require.resolve('bootstrap')];
    delete require.cache[require.resolve('bootstrap/js/modal')];
    //delete require.cache[require.resolve('bootstrap/js/dist/modal')];
    delete require.cache[require.resolve('bootstrap-colorpicker')];
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.HTMLElement;
  });

  after(() => {
    delete global.chrome;
  });
};

module.exports.initI18n = initI18n;
module.exports.initDom = initDom;
module.exports.initDom2 = initDom2;
module.exports.registerHooks = registerHooks;
