const chrome = require('sinon-chrome');

const before = function () {
  global.chrome = chrome;
};

const beforeEach = function () {
  chrome.flush();
};

const after = function () {
  delete global.chrome;
};

module.exports.before = before;
module.exports.beforeEach = beforeEach;
module.exports.after = after;
