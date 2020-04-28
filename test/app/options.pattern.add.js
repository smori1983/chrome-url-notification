const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');

describe('options.pattern.add', function () {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('error', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        {
          url: 'example.com',
          msg: 'message',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);

      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      header.show();
      testUtil.options.header().clickAdd();
    });

    sharedForm.runError();

    it('patten cannot be duplicated', function () {
      const form = testUtil.options.patternForm();

      form.pattern('example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', function () {
    beforeEach(function () {
      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      header.show();
      testUtil.options.header().clickAdd();
    });

    it('register simple data', function () {
      const form = testUtil.options.patternForm();

      form.pattern('example.com');
      form.message('example');
      form.submit();

      assert.strictEqual(testUtil.options.list().numOfItems(), 1);

      const item = testUtil.options.list().item(0);
      assert.strictEqual(item.pattern(), 'example.com');
      assert.strictEqual(item.message(), 'example');
    });
  });
});
