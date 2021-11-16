const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Options = testUtil.Options;
const Storage = testUtil.Storage;

describe('app.options.importForm', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Options}
   */
  let options;

  beforeEach(() => {
    const dom = testUtil.dom.initOptions('src/html/options.html');

    storage = new Storage(dom.window.localStorage);

    chrome = new ChromeMock(dom.window.chrome);
    chrome.i18n('en');

    options = new Options(dom.window.jQuery);
  });

  it('i18n label', () => {
    options.header().clickImport();

    const importForm = options.importForm();

    assert.strictEqual(importForm.labelJsonTextInput(), 'JSON text');
    assert.strictEqual(importForm.labelImportButton(), 'Import');
    assert.strictEqual(importForm.labelCancelButton(), 'Cancel');
  });

  describe('import - failure', () => {
    it('input is empty', () => {
      options.header().clickImport();

      const form = options.importForm();
      form.submit();

      assert.strictEqual(form.errorMessage(), 'JSON text is required.');
    });

    it('not a JSON text', () => {
      options.header().clickImport();

      const form = options.importForm();
      form.json('foo');
      form.submit();

      assert.strictEqual(form.errorMessage(), 'JSON text is invalid.');
    });

    it('invalid JSON structure', () => {
      options.header().clickImport();

      const form = options.importForm();
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

      assert.strictEqual(form.errorMessage(), 'JSON text is invalid.');
    });
  });

  describe('import - success', () => {
    it('without data - add no data', () => {
      options.header().clickImport();

      const form = options.importForm();
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 0);
    });

    it('without data - add new data', () => {
      options.header().clickImport();

      const form = options.importForm();
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

    it('with data - add no data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '000000',
          displayPosition: 'bottom_right',
          status: 1,
        },
      ]);

      options.header().clickImport();

      const form = options.importForm();
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 1);

      const data = storage.getAll();

      assert.strictEqual(data[0].url, 'site1.example.com');
      assert.strictEqual(data[0].msg, 'site1');
      assert.strictEqual(data[0].backgroundColor, '000000');
      assert.strictEqual(data[0].displayPosition, 'bottom_right');
      assert.strictEqual(data[0].status, 1);
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

      options.header().clickImport();

      const form = options.importForm();
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

      options.header().clickImport();

      const form = options.importForm();
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
