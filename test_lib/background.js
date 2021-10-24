const chrome = require('sinon-chrome');
const { before, beforeEach, after } = require('mocha');

const registerHooks = () => {
  before(() => {
    global.chrome = chrome;
  });

  beforeEach(() => {
    chrome.flush();
  });

  after(() => {
    delete global.chrome;
  })
};

module.exports.registerHooks = registerHooks;
