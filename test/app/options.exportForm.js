const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.exportForm', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
    header.show();
    testUtil.options.header().clickExport();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('i18n label', function () {
    const $ = require('jquery');

    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  describe('exported json', function () {
    it('version should be current', function () {
      const json = testUtil.options.exportForm().json();

      assert.strictEqual(json.version, testUtil.currentVersion());
    });

    it('without pattern data', function () {
      const json = testUtil.options.exportForm().json();

      assert.deepStrictEqual(json.pattern, []);
    });

    it('with pattern data', function () {
      testUtil.setUpStorage('3', [
        {
          url: 'http://example.com/1',
          msg: 'message1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);
      testUtil.options.header().clickExport();

      const json = testUtil.options.exportForm().json();

      assert.strictEqual(json.pattern.length, 1);
      assert.deepStrictEqual(json.pattern[0], {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      });
    });
  });
});
