const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/options.importForm');
const storage = require('../../src/js/urlNotification/storage');
const testUtil = require('../../test_lib/util');

describe('options.importForm', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('i18n label', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    const $ = require('jquery');

    SUT.show(function() {});

    const $container = $('#js_modal_import_container');
    assert.strictEqual($container.find('label[data-i18n=label_json_text]').text(), 'JSON text');
    assert.strictEqual($container.find('input[data-i18n-val=label_import]').val(), 'Import');
    assert.strictEqual($container.find('input[data-i18n-val=label_cancel]').val(), 'Cancel');
  });

  describe('import - success', function () {
    it('without data', function () {
      testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

      SUT.show(function () {});

      const form = testUtil.options.importForm();
      form.json(JSON.stringify({
        version: testUtil.currentVersion(),
        pattern: [
          {
            url: 'http://example.com/',
            msg: 'message',
            backgroundColor: '111111',
            displayPosition: 'bottom',
            status: 0,
          },
        ],
      }));
      form.submit();

      assert.strictEqual(storage.getCount(), 1);

      const data = storage.getAll();
      assert.strictEqual(data[0].url, 'http://example.com/');
      assert.strictEqual(data[0].msg, 'message');
      assert.strictEqual(data[0].backgroundColor, '111111');
      assert.strictEqual(data[0].displayPosition, 'bottom');
      assert.strictEqual(data[0].status, 0);
    });
  });
});
