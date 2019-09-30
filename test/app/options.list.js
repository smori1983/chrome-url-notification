const fs = require('fs');
const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins/i18n');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');

describe('options.list', function () {
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
    delete require.cache[require.resolve('jquery-validation')];
    delete require.cache[require.resolve('bootstrap')];
    delete require.cache[require.resolve('bootstrap/js/modal')];
    delete require.cache[require.resolve('bootstrap-colorpicker')];
  });

  after(function () {
    delete (global.chrome);
  });

  it('tr element - without pattern data', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    SUT.show();

    assert.strictEqual(testUtil.opttions.list().header().length, 0);
    assert.strictEqual(testUtil.opttions.list().numOfItems(), 0);
  });

  it('tr element - with pattern data', function () {
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

    SUT.show();

    assert.strictEqual(testUtil.opttions.list().header().length, 1);
    assert.strictEqual(testUtil.opttions.list().numOfItems(), 1);
  });

  it('header columns', function () {
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

    const $ = require('jquery');

    SUT.show();

    const $columns = testUtil.opttions.list().header().find('th');

    assert.strictEqual($columns.length, 5);
    assert.strictEqual($($columns[0]).text(), 'URL pattern');
    assert.strictEqual($($columns[1]).text(), 'Message');
    assert.strictEqual($($columns[2]).text(), 'Display position');
    assert.strictEqual($($columns[3]).text(), 'Enabled');
    assert.strictEqual($($columns[4]).text(), 'Operation');
  });

  it('list area', function () {
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

    SUT.show();

    assert.strictEqual(testUtil.opttions.list().numOfItems(), 1);

    const item = testUtil.opttions.list().item(0);
    assert.strictEqual(item.pattern(), 'http://example.com/1');
    assert.strictEqual(item.message(), 'message1');
    assert.strictEqual(item.displayPosition(), 'Top');
    assert.strictEqual(item.status(), 'Y');
  });

  it('copy button', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'http://example.com/2',
        msg: 'message2',
        backgroundColor: '111111',
        displayPosition: 'bottom',
        status: 0,
      },
    ]);

    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    SUT.show();

    const list = testUtil.opttions.list();
    const form = testUtil.opttions.patternForm();

    list.item(0).clickCopy();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/1');

    list.item(1).clickCopy();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/2');
  });

  it('edit button', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'http://example.com/2',
        msg: 'message2',
        backgroundColor: '111111',
        displayPosition: 'bottom',
        status: 0,
      },
    ]);

    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    SUT.show();

    const list = testUtil.opttions.list();
    const form = testUtil.opttions.patternForm();

    list.item(0).clickEdit();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/1');

    list.item(1).clickEdit();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/2');
  });

  it('delete button', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'http://example.com/2',
        msg: 'message2',
        backgroundColor: '111111',
        displayPosition: 'bottom',
        status: 0,
      },
    ]);

    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    SUT.show();

    const list = testUtil.opttions.list();
    const form = testUtil.opttions.deleteForm();

    list.item(0).clickDelete();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/1');
    assert.strictEqual(form.message(), 'message1');

    list.item(1).clickDelete();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/2');
    assert.strictEqual(form.message(), 'message2');
  });
});
