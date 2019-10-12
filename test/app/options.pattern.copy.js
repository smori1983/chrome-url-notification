const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const list = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');

describe('options.pattern.copy', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('error', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion(), [
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

      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      list.show();
      testUtil.options.list().item(0).clickCopy();
    });

    it('patten is required', function () {
      const form = testUtil.options.patternForm();

      form.pattern('');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
    });

    it('patten cannot be duplicated - keeps original value', function () {
      const form = testUtil.options.patternForm();

      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });

    it('patten cannot be duplicated - change to existing value', function () {
      const form = testUtil.options.patternForm();

      form.pattern('domain2.example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });

    it('message is required', function () {
      const form = testUtil.options.patternForm();

      form.message('');
      form.submit();

      assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
    });

    it('background color is required', function () {
      const form = testUtil.options.patternForm();

      form.backgroundColor('');
      form.submit();

      assert.strictEqual(form.errorMessage('background_color'), 'This field is required.');
    });

    it('background color should be valid color index', function () {
      const form = testUtil.options.patternForm();

      form.backgroundColor('#0000');
      form.submit();

      assert.strictEqual(form.errorMessage('background_color'), 'Invalid color index.');
    });

    it('open form and submit invalid inputs multiple times', function () {
      const form = testUtil.options.patternForm();

      form.pattern('');
      form.submit();

      testUtil.options.header().clickAdd();

      form.pattern('');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
    });
  });

  describe('ok', function () {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion(), [
        {
          url: 'domain1.example.com',
          msg: 'domain1',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 1,
        },
      ]);

      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      list.show();
      testUtil.options.list().item(0).clickCopy();
    });

    it('initial state', function () {
      const form = testUtil.options.patternForm();

      assert.strictEqual(form.pattern(), 'domain1.example.com');
      assert.strictEqual(form.message(), 'domain1');
      assert.strictEqual(form.backgroundColor(), '#111111');
      assert.strictEqual(form.displayPosition(), 'bottom');
      assert.strictEqual(form.status(), true);
    });

    it('edit form and save', function () {
      const form = testUtil.options.patternForm();
      form.pattern('domain2.example.com');
      form.message('domain2');
      form.backgroundColor('#222222');
      form.displayPosition('top');
      form.status(false);
      form.submit();

      assert.strictEqual(testUtil.options.list().numOfItems(), 2);

      const item1 = testUtil.options.list().item(0);
      assert.strictEqual(item1.pattern(), 'domain1.example.com');
      assert.strictEqual(item1.message(), 'domain1');
      assert.strictEqual(item1.displayPosition(), 'Bottom');
      assert.strictEqual(item1.status(), 'Y');

      const item2 = testUtil.options.list().item(1);
      assert.strictEqual(item2.pattern(), 'domain2.example.com');
      assert.strictEqual(item2.message(), 'domain2');
      assert.strictEqual(item2.displayPosition(), 'Top');
      assert.strictEqual(item2.status(), 'n');
    });
  });
});
