const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;

const before = function () {
  global.chrome = chrome;
};

const beforeEach = function () {
  chrome.flush();

  delete require.cache[require.resolve('jquery')];
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
