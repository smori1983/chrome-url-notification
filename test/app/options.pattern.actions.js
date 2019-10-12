const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const list = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');

describe('options.pattern.actions', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
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

    it('clear button works', function () {
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

    it('cancel button works', function () {
      const form = testUtil.options.patternForm();
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form multiple times with invalid inputs', function () {
    beforeEach(function () {
      testUtil.options.header().clickAdd();

      const form = testUtil.options.patternForm();
      form.submit();
      form.submit();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
    });

    it('clear button works', function () {
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

    it('cancel button works', function () {
      const form = testUtil.options.patternForm();
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form with invalid inputs and open copy form', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion(), [
        {
          url: 'domain11.example.com',
          msg: 'domain11',
          backgroundColor: 'cccccc',
          displayPosition: 'bottom',
          status: 1,
        },
      ]);
      list.show();

      testUtil.options.header().clickAdd();

      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.list().item(0).clickCopy();
    });

    it('initial state', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.pattern(), 'domain11.example.com');
      assert.strictEqual(form.message(), 'domain11');
      assert.strictEqual(form.backgroundColor(), '#cccccc');
      assert.strictEqual(form.displayPosition(), 'bottom');
      assert.strictEqual(form.status(), true);
    });

    it('error messages should not be shown', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('clear button works', function () {
      const form = testUtil.options.patternForm();
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('cancel button works', function () {
      const form = testUtil.options.patternForm();
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });

  describe('submit add form with invalid inputs and open edit form', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion(), [
        {
          url: 'domain21.example.com',
          msg: 'domain21',
          backgroundColor: '999999',
          displayPosition: 'top',
          status: 0,
        },
      ]);
      list.show();

      testUtil.options.header().clickAdd();

      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');

      testUtil.options.list().item(0).clickEdit();
    });

    it('initial state', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.pattern(), 'domain21.example.com');
      assert.strictEqual(form.message(), 'domain21');
      assert.strictEqual(form.backgroundColor(), '#999999');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), false);
    });

    it('error messages should not be shown', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.errorMessage('url'), '');
      assert.strictEqual(form.errorMessage('msg'), '');
    });

    it('clear button works', function () {
      const form = testUtil.options.patternForm();
      form.clear();

      assert.strictEqual(form.pattern(), '');
      assert.strictEqual(form.message(), '');
      assert.strictEqual(form.backgroundColor(), '#000000');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), true);
    });

    it('cancel button works', function () {
      const form = testUtil.options.patternForm();
      form.cancel();

      assert.strictEqual(form.shown(), false);
    });
  });
});
