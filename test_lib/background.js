const chrome = require('sinon-chrome');

const before = () => {
  global.chrome = chrome;
};

const beforeEach = () => {
  chrome.flush();
};

const after = () => {
  delete global.chrome;
};

module.exports.before = before;
module.exports.beforeEach = beforeEach;
module.exports.after = after;
