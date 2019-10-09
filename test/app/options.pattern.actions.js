const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.pattern.actions', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });

    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    header.show();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('submit add form with invalid inputs and open again', function () {
    beforeEach(function () {
      testUtil.options.header().clickAdd();

      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.header().clickAdd();
    });

    it('form fields should be initialized', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('error messages should not be shown', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('submit add form with invalid inputs again', function () {
      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
    });

    it('clear form works', function () {
      const form = testUtil.options.patternForm();
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('cancel form works', function () {
      const form = testUtil.options.patternForm();
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });
});
