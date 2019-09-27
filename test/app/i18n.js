const fs = require('fs');
const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const SUT = require('../../src/js/app/i18n');

describe('i18n', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    const localeFile = __dirname + '/../../src/_locales/en/messages.json';
    const message = fs.readFileSync(localeFile).toString();
    chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
  });

  after(function () {
    delete(global.chrome);
  });

  describe('get', function () {
    it('label_background_color', function () {
      assert.strictEqual(SUT.get('label_background_color'), 'Background color');
    });
  });
});
