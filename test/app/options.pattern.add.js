const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');
const Storage = require('../../test_lib/storage');

// See: https://github.com/mochajs/mocha/wiki/Shared-Behaviours

describe('app.options.pattern.add', function () {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {jQuery}
   */
  let $;

  beforeEach(function () {
    const dom = testUtil.uiBase.initOptions(testUtil.getHtml('src/html/options.html'));

    storage = new Storage(dom.window.localStorage);
    this.$ = $ = dom.window.jQuery;

    storage.init(testUtil.currentVersion().toString(), [
      {
        url: 'example.com',
        msg: 'message',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    testUtil.uiBase.i18n(dom.window.chrome, 'en');

    testUtil.options.list($).reload();

    testUtil.options.header($).clickAdd();
  });

  describe('i18n', () => {
    it('url field placeholder', () => {
      const $element = $('#js_input_url').eq(0);

      assert.strictEqual($element.attr('placeholder'), 'e.g. http://*.example.com/');
    });

    it('message field placeholder', () => {
      const $element = $('#js_input_msg').eq(0);

      assert.strictEqual($element.attr('placeholder'), 'e.g. example.com production site');
    });
  });

  describe('error', function () {
    sharedForm.runError();

    it('patten cannot be duplicated', () => {
      const form = testUtil.options.patternForm($);

      form.pattern('example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', () => {
    beforeEach(() => {
      storage.clear();

      testUtil.options.list($).reload();
    });

    it('register simple data', () => {
      const form = testUtil.options.patternForm($);

      form.pattern('example.com');
      form.message('example');
      form.submit();

      assert.strictEqual(testUtil.options.list($).numOfItems(), 1);

      const item = testUtil.options.list($).item(0);
      assert.strictEqual(item.pattern(), 'example.com');
      assert.strictEqual(item.message(), 'example');
      assert.strictEqual(item.backgroundColor(), '#000000');
      assert.strictEqual(item.displayPosition(), 'Top');
      assert.strictEqual(item.status(), 'Y');
    });
  });
});
