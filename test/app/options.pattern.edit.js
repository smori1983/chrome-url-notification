const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const list = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');

describe('options.pattern.edit', function () {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('error', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        {
          url: 'domain7.example.com',
          msg: 'domain7',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 0,
        },
        {
          url: 'domain8.example.com',
          msg: 'domain8',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 1,
        },
      ]);

      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      list.show();
      testUtil.options.list().item(0).clickEdit();
    });

    sharedForm.runError();

    it('patten cannot be duplicated - change to existing value', function () {
      const form = testUtil.options.patternForm();

      form.pattern('domain8.example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        {
          url: 'domain9.example.com',
          msg: 'domain9',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 0,
        },
      ]);

      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      list.show();
      testUtil.options.list().item(0).clickEdit();
    });

    it('initial state', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.pattern(), 'domain9.example.com');
      assert.strictEqual(form.message(), 'domain9');
      assert.strictEqual(form.backgroundColor(), '#111111');
      assert.strictEqual(form.displayPosition(), 'top');
      assert.strictEqual(form.status(), false);
    });

    it('keeping original pattern is not an error', function() {
      const form = testUtil.options.patternForm();

      form.submit();

      assert.strictEqual(form.shown(), false);
    });

    it('edit form and save', function() {
      const form = testUtil.options.patternForm();
      form.pattern('domain10.example.com');
      form.message('domain10');
      form.backgroundColor('#333333');
      form.displayPosition('bottom');
      form.status(true);
      form.submit();

      assert.strictEqual(testUtil.options.list().numOfItems(), 1);

      const item1 = testUtil.options.list().item(0);
      assert.strictEqual(item1.pattern(), 'domain10.example.com');
      assert.strictEqual(item1.message(), 'domain10');
      assert.strictEqual(item1.displayPosition(), 'Bottom');
      assert.strictEqual(item1.status(), 'Y');
    });
  });
});
