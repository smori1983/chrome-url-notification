const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');
const ChromeMock = testUtil.ChromeMock;
const Options = testUtil.Options;
const Storage = testUtil.Storage;

// See: https://github.com/mochajs/mocha/wiki/Shared-Behaviours

describe('app.options.pattern.copy', function () {
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
    const dom = testUtil.dom.initOptions('src/html/options.html');

    storage = new Storage(dom.window.localStorage);

    chrome = new ChromeMock(dom.window.chrome);
    chrome.i18n('en');

    options = new Options(dom.window.jQuery);

    this.options = options;
  });

  describe('error', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'domain1.example.com',
          msg: 'domain1',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 1,
        },
        {
          url: 'domain2.example.com',
          msg: 'domain2',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);

      options.list().reload();
      options.list().item(0).clickCopy();
    });

    sharedForm.runError();

    it('patten cannot be duplicated - keep original value', () => {
      const form = options.patternForm();

      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });

    it('patten cannot be duplicated - change to existing value', () => {
      const form = options.patternForm();

      form.pattern('domain2.example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'domain1.example.com',
          msg: 'domain1',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 1,
        },
      ]);

      options.list().reload();
      options.list().item(0).clickCopy();
    });

    it('initial state', () => {
      const form = options.patternForm();

      assert.strictEqual(form.pattern(), 'domain1.example.com');
      assert.strictEqual(form.message(), 'domain1');
      assert.strictEqual(form.backgroundColor(), '#111111');
      assert.strictEqual(form.displayPosition(), 'bottom');
      assert.strictEqual(form.status(), true);
    });

    it('edit form and save', () => {
      const form = options.patternForm();
      form.pattern('domain2.example.com');
      form.message('domain2');
      form.backgroundColor('#222222');
      form.displayPosition('top');
      form.status(false);
      form.submit();

      assert.strictEqual(options.list().numOfItems(), 2);

      const item1 = options.list().item(0);
      assert.strictEqual(item1.pattern(), 'domain1.example.com');
      assert.strictEqual(item1.message(), 'domain1');
      assert.strictEqual(item1.backgroundColor(), '#111111');
      assert.strictEqual(item1.displayPosition(), 'Bottom');
      assert.strictEqual(item1.status(), 'Y');

      const item2 = options.list().item(1);
      assert.strictEqual(item2.pattern(), 'domain2.example.com');
      assert.strictEqual(item2.message(), 'domain2');
      assert.strictEqual(item2.backgroundColor(), '#222222');
      assert.strictEqual(item2.displayPosition(), 'Top');
      assert.strictEqual(item2.status(), 'n');
    });
  });
});
