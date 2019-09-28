const fs = require('fs');
const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/options.exportForm');
const testUtil = require('../../test_lib/util');

describe('options.exportForm', function () {
  before(function() {
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

  after(function() {
    delete(global.chrome);
  });

  it('i18n label', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    // clipboard checks constructor argument is instance of HTMLElement or not.
    // We have to expose to global.
    global.HTMLElement = dom.window.HTMLElement;

    const $ = require('jquery');

    SUT.show();

    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  it('exported json - version is current', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    // clipboard checks constructor argument is instance of HTMLElement or not.
    // We have to expose to global.
    global.HTMLElement = dom.window.HTMLElement;

    const $ = require('jquery');

    SUT.show();

    const exported = $('#js_export_display').text();
    const json = JSON.parse(exported);

    assert.strictEqual(json.version, testUtil.currentVersion());
  });

  it('exported json - without pattern data', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    // clipboard checks constructor argument is instance of HTMLElement or not.
    // We have to expose to global.
    global.HTMLElement = dom.window.HTMLElement;

    const $ = require('jquery');

    SUT.show();

    const exported = $('#js_export_display').text();
    const json = JSON.parse(exported);

    assert.deepStrictEqual(json.pattern, []);
  });

  it('exported json - with pattern data', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    // clipboard checks constructor argument is instance of HTMLElement or not.
    // We have to expose to global.
    global.HTMLElement = dom.window.HTMLElement;

    const $ = require('jquery');

    SUT.show();

    const exported = $('#js_export_display').text();
    const json = JSON.parse(exported);

    assert.strictEqual(json.pattern.length, 1);
    assert.deepStrictEqual(json.pattern[0].msg, 'message1');
  });
});
