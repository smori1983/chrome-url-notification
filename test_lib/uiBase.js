const fs = require('fs');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;

const initI18n2 = (chrome, locale) => {
  const localeFile = __dirname + '/../src/_locales/' + locale + '/messages.json';
  const message = fs.readFileSync(localeFile).toString();
  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
};

/**
 * @param {string} content
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initContentScript = (content, options) => {
  const path = __dirname + '/../dist/test/js/content.js';

  return initDom(content, options || {}, path);
};

/**
 * @param {string} content
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initOptions = (content, options) => {
  const path = __dirname + '/../dist/test/js/options.js';

  return initDom(content, options || {}, path);
};

/**
 * @param {string} content
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initPopup = (content, options) => {
  const path = __dirname + '/../dist/test/js/popup.js';

  return initDom(content, options || {}, path);
};

/**
 * @param {string} content
 * @param {Object} options
 * @param {string} jsFilePath
 * @return {JSDOM}
 */
const initDom = (content, options, jsFilePath) => {
  // Necessary for usage of localStorage.
  options.url = options.url || 'https://localhost';
  options.runScripts = 'outside-only';

  const dom = new JSDOM(content, options);

  dom.window.eval(fs.readFileSync(jsFilePath, {
    encoding: 'utf-8',
  }));

  return dom;
};

module.exports.initI18n2 = initI18n2;
module.exports.initContentScript = initContentScript;
module.exports.initOptions = initOptions;
module.exports.initPopup = initPopup;
