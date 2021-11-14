const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Storage = require('../../test_lib/storage');

describe('app.options.importForm', () => {
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

  it('i18n label', () => {
    testUtil.options.header($).clickImport();

    const $container = $('#js_modal_import_container');

    assert.strictEqual($container.find('label[data-i18n=label_json_text]').text(), 'JSON text');
    assert.strictEqual($container.find('input[data-i18n-val=label_import]').val(), 'Import');
    assert.strictEqual($container.find('input[data-i18n-val=label_cancel]').val(), 'Cancel');
  });

  describe('import - failure', () => {
    it('input is empty', () => {
      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.submit();

      assert.strictEqual(testUtil.options.importForm($).errorMessage(), 'JSON text is required.');
    });

    it('not a JSON text', () => {
      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.json('foo');
      form.submit();

      assert.strictEqual(testUtil.options.importForm($).errorMessage(), 'JSON text is invalid.');
    });

    it('invalid JSON structure', () => {
      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'http://example.com/',
            msg: 'message',
          },
        ],
      }));
      form.submit();

      assert.strictEqual(testUtil.options.importForm($).errorMessage(), 'JSON text is invalid.');
    });
  });

  describe('import - success', () => {
    it('without data', () => {
      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'example.com',
            msg: 'message',
            backgroundColor: '111111',
            displayPosition: 'bottom_left',
            status: 0,
          },
        ],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 1);

      const data = storage.getAll();
      assert.strictEqual(data[0].url, 'example.com');
      assert.strictEqual(data[0].msg, 'message');
      assert.strictEqual(data[0].backgroundColor, '111111');
      assert.strictEqual(data[0].displayPosition, 'bottom_left');
      assert.strictEqual(data[0].status, 0);
    });

    it('with data - update existing data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '333333',
          displayPosition: 'top_right',
          status: 0,
        },
      ]);

      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'site1.example.com',
            msg: 'site1-edit',
            backgroundColor: '777777',
            displayPosition: 'bottom_right',
            status: 1,
          },
        ],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 1);

      const data = storage.getAll();

      assert.strictEqual(data[0].url, 'site1.example.com');
      assert.strictEqual(data[0].msg, 'site1-edit');
      assert.strictEqual(data[0].backgroundColor, '777777');
      assert.strictEqual(data[0].displayPosition, 'bottom_right');
      assert.strictEqual(data[0].status, 1);
    });

    it('with data - add new data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top_left',
          status: 1,
        },
      ]);

      testUtil.options.header($).clickImport();

      const form = testUtil.options.importForm($);
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'site2.example.com',
            msg: 'site2',
            backgroundColor: '999999',
            displayPosition: 'bottom_right',
            status: 0,
          },
        ],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 2);

      const data = storage.getAll();

      assert.strictEqual(data[0].url, 'site1.example.com');
      assert.strictEqual(data[0].msg, 'site1');
      assert.strictEqual(data[0].backgroundColor, '111111');
      assert.strictEqual(data[0].displayPosition, 'top_left');
      assert.strictEqual(data[0].status, 1);

      assert.strictEqual(data[1].url, 'site2.example.com');
      assert.strictEqual(data[1].msg, 'site2');
      assert.strictEqual(data[1].backgroundColor, '999999');
      assert.strictEqual(data[1].displayPosition, 'bottom_right');
      assert.strictEqual(data[1].status, 0);
    });
  });
});
