const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Storage = require('../../test_lib/storage');

describe('app.options.pattern.actions', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {jQuery}
   */
  let $;

  beforeEach(() => {
    const dom = testUtil.uiBase.initOptions(testUtil.getHtml('src/html/options.html'));

    storage = new Storage(dom.window.localStorage);
    $ = dom.window.jQuery;

    testUtil.uiBase.initI18n2(dom.window.chrome, 'en');
  });

  describe('submit add form with invalid inputs and open again', () => {
    beforeEach(() => {
      testUtil.options.header($).clickAdd();

      const form = testUtil.options.patternForm($);
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.header($).clickAdd();
    });

    it('form fields should be initialized', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('error messages should not be shown', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('submit add form with invalid inputs again', () => {
      const form = testUtil.options.patternForm($);
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
    });

    it('clear button works', () => {
      const form = testUtil.options.patternForm($);
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('cancel button works', () => {
      const form = testUtil.options.patternForm($);
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form multiple times with invalid inputs', () => {
    beforeEach(() => {
      testUtil.options.header($).clickAdd();

      const form = testUtil.options.patternForm($);
      form.submit();
      form.submit();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
    });

    it('clear button works', () => {
      const form = testUtil.options.patternForm($);
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('cancel button works', () => {
      const form = testUtil.options.patternForm($);
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form with invalid inputs and open copy form', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'domain11.example.com',
          msg: 'domain11',
          backgroundColor: 'cccccc',
          displayPosition: 'bottom',
          status: 1,
        },
      ]);

      testUtil.options.list($).reload();

      testUtil.options.header($).clickAdd();

      const form = testUtil.options.patternForm($);
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.list($).item(0).clickCopy();
    });

    it('initial state', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.pattern(), 'domain11.example.com');
      assert.strictEqual(form.message(), 'domain11');
      assert.strictEqual(form.backgroundColor(), '#cccccc');
      assert.strictEqual(form.displayPosition(), 'bottom');
      assert.strictEqual(form.status(), true);
    });

    it('error messages should not be shown', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('clear button works', () => {
      const form = testUtil.options.patternForm($);
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('cancel button works', () => {
      const form = testUtil.options.patternForm($);
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form with invalid inputs and open edit form', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'domain21.example.com',
          msg: 'domain21',
          backgroundColor: '999999',
          displayPosition: 'top',
          status: 0,
        },
      ]);

      testUtil.options.list($).reload();

      testUtil.options.header($).clickAdd();

      const form = testUtil.options.patternForm($);
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.list($).item(0).clickEdit();
    });

    it('initial state', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.pattern(), 'domain21.example.com');
      assert.strictEqual(form.message(), 'domain21');
      assert.strictEqual(form.backgroundColor(), '#999999');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), false);
    });

    it('error messages should not be shown', () => {
      const form = testUtil.options.patternForm($);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('clear button works', () => {
      const form = testUtil.options.patternForm($);
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('cancel button works', () => {
      const form = testUtil.options.patternForm($);
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });
});
