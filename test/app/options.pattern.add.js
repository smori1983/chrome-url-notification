const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');
const sharedForm = require('./shared/options.form');

describe('app.options.pattern.add', () => {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('i18n', () => {
    beforeEach(() => {
      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      header.show();
      testUtil.options.header().clickAdd();
    });

    it('url field placeholder', () => {
      const $ = require('jquery');
      const $element = $('#js_input_url').eq(0);

      assert.strictEqual($element.attr('placeholder'), 'e.g. http://*.example.com/');
    });

    it('message field placeholder', () => {
      const $ = require('jquery');
      const $element = $('#js_input_msg').eq(0);

      assert.strictEqual($element.attr('placeholder'), 'e.g. example.com production site');
    });
  });

  describe('error', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
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

    it('patten cannot be duplicated', () => {
      const form = testUtil.options.patternForm();

      form.pattern('example.com');
      form.submit();

      assert.strictEqual(form.errorMessage('url'), 'URL pattern already exists.');
    });
  });

  describe('ok', () => {
    beforeEach(() => {
      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
      header.show();
      testUtil.options.header().clickAdd();
    });

    it('register simple data', () => {
      const form = testUtil.options.patternForm();

      form.pattern('example.com');
      form.message('example');
      form.submit();

      assert.strictEqual(testUtil.options.list().numOfItems(), 1);

      const item = testUtil.options.list().item(0);
      assert.strictEqual(item.pattern(), 'example.com');
      assert.strictEqual(item.message(), 'example');
      assert.strictEqual(item.backgroundColor(), '#000000');
      assert.strictEqual(item.displayPosition(), 'Top');
      assert.strictEqual(item.status(), 'Y');
    });
  });
});
