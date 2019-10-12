const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.pattern.add', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('error', function () {
    beforeEach(function () {
      testUtil.setUpStorage('3', [
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

    it('patten is required', function () {
      const form = testUtil.options.patternForm();

      form.pattern('');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'This field is required.');
    });

    it('patten cannot be duplicated', function () {
      const form = testUtil.options.patternForm();

      form.pattern('example.com');
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

    it('modify value of display position', function () {
      const $ = require('jquery');
      $('input[name=display_position]').val('foo');

      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('display_position'), 'Invalid choice.');
    });

    it('modify value of status', function () {
      const $ = require('jquery');
      $('#js_input_status').val('2');

      const form = testUtil.options.patternForm();
      form.submit();

      assert.strictEqual(form.errorMessage('status'), 'Invalid choice.');
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
