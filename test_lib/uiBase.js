const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const file = require('./file');

const i18n = (chrome, locale) => {
  const path = 'src/_locales/' + locale + '/messages.json';
  const message = file.read(path);

  chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
};

/**
 * @param {string} path
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initContentScript = (path, options) => {
  const content = file.read(path);
  const jsFilePath = 'dist/test/js/content.js';

  return initDom(content, options || {}, jsFilePath);
};

/**
 * @param {string} path
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initOptions = (path, options) => {
  const content = file.read(path);
  const jsFilePath = 'dist/test/js/options.js';

  return initDom(content, options || {}, jsFilePath);
};

/**
 * @param {string} path
 * @param {Object} [options]
 * @return {JSDOM}
 */
const initPopup = (path, options) => {
  const content = file.read(path);
  const jsFilePath = 'dist/test/js/popup.js';

  return initDom(content, options || {}, jsFilePath);
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

  dom.window.eval(file.read(jsFilePath));

  return dom;
};

module.exports.i18n = i18n;
module.exports.initContentScript = initContentScript;
module.exports.initOptions = initOptions;
module.exports.initPopup = initPopup;
