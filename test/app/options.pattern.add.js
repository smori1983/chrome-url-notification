const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');
const ChromeMock = testUtil.ChromeMock;
const Options = testUtil.Options;
const Storage = testUtil.Storage;

// See: https://github.com/mochajs/mocha/wiki/Shared-Behaviours

describe('app.options.pattern.add', function () {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Options}
   */
  let options;

  beforeEach(function () {
    const dom = testUtil.uiBase.initOptions('src/html/options.html');

    this.$ = dom.window.jQuery;

    storage = new Storage(dom.window.localStorage);
    storage.init(testUtil.currentVersion().toString(), [
      {
        url: 'example.com',
        msg: 'message',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    chrome = new ChromeMock(dom.window.chrome);
    chrome.i18n('en');

    this.options = options = new Options(dom.window.jQuery);
    options.list().reload();
    options.header().clickAdd();
  });

  describe('i18n', () => {
    it('url field placeholder', () => {
      assert.strictEqual(options.patternForm().patternPlaceholder(), 'e.g. http://*.example.com/');
    });

    it('message field placeholder', () => {
      assert.strictEqual(options.patternForm().messagePlaceholder(), 'e.g. example.com production site');
    });
  });

  describe('error', function () {
    sharedForm.runError();

    it('patten cannot be duplicated', () => {
      const form = options.patternForm();

      form.pattern('example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', () => {
    beforeEach(() => {
      storage.clear();

      options.list().reload();
    });

    it('register simple data', () => {
      const form = options.patternForm();

      form.pattern('example.com');
      form.message('example');
      form.submit();

      assert.strictEqual(options.list().numOfItems(), 1);

      const item = options.list().item(0);
      assert.strictEqual(item.pattern(), 'example.com');
      assert.strictEqual(item.message(), 'example');
      assert.strictEqual(item.backgroundColor(), '#000000');
      assert.strictEqual(item.displayPosition(), 'Top');
      assert.strictEqual(item.status(), 'Y');
    });
  });
});
