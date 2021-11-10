const fs = require('fs');
const { before, beforeEach, after, afterEach } = require('mocha');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;

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

const initI18n2 = (chrome, locale) => {
  const localeFile = __dirname + '/../src/_locales/' + locale + '/messages.json';
  const message = fs.readFileSync(localeFile).toString();
  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
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

/**
 * @param {string} content
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initDom3 = (content, options) => {
  options = options || {};

  // Necessary for usage of localStorage.
  options.url = options.url || 'https://localhost';

  options.runScripts = 'outside-only';

  const dom = new JSDOM(content, options);

  const js = fs.readFileSync(__dirname + '/../dist/test/js/options.js', {
    encoding: 'utf-8',
  });
  dom.window.eval(js);

  return dom;
};

const registerHooks = () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    chrome.flush();

    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });
  });

  afterEach(() => {
  });

  after(() => {
    delete global.chrome;
  });
};

module.exports.initI18n = initI18n;
module.exports.initI18n2 = initI18n2;
module.exports.initDom = initDom;
module.exports.initDom2 = initDom2;
module.exports.initDom3 = initDom3;
module.exports.registerHooks = registerHooks;
