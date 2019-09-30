const fs = require('fs');
const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/options.importForm');
const storage = require('../../src/js/urlNotification/storage');
const testUtil = require('../../test_lib/util');

describe('options.importForm', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    testUtil.clearStorage();

    const localeFile = __dirname + '/../../src/_locales/en/messages.json';
    const message = fs.readFileSync(localeFile).toString();
    chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));

    chrome.flush();
    delete require.cache[require.resolve('jquery')];
    delete require.cache[require.resolve('bootstrap')];
    delete require.cache[require.resolve('bootstrap/js/modal')];
  });

  after(function () {
    delete (global.chrome);
  });

  it('i18n label', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    const $ = require('jquery');

    SUT.show(function() {});

    const $container = $('#js_modal_import_container');
    assert.strictEqual($container.find('label[data-i18n=label_json_text]').text(), 'JSON text');
    assert.strictEqual($container.find('input[data-i18n-val=label_import]').val(), 'Import');
    assert.strictEqual($container.find('input[data-i18n-val=label_cancel]').val(), 'Cancel');
  });

  describe('import - success', function () {
    it('without data', function () {
      const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

      global.window = dom.window;
      global.document = dom.window.document;

      SUT.show(function () {
      });

      const form = testUtil.opttions.importForm();
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'http://example.com/',
            msg: 'message',
            backgroundColor: '111111',
            displayPosition: 'bottom',
            status: 0,
          },
        ],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 1);

      const data = storage.getAll();
      assert.strictEqual(data[0].url, 'http://example.com/');
      assert.strictEqual(data[0].msg, 'message');
      assert.strictEqual(data[0].backgroundColor, '111111');
      assert.strictEqual(data[0].displayPosition, 'bottom');
      assert.strictEqual(data[0].status, 0);
    });
  });
});
