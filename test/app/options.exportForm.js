const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Storage = require('../../test_lib/storage');

describe('app.options.exportForm', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {jQuery}
   */
  let $;

  beforeEach(() => {
    const dom = testUtil.uiBase.initDom3(testUtil.getHtml('src/html/options.html'));

    storage = new Storage(dom.window.localStorage);
    $ = dom.window.jQuery;

    testUtil.uiBase.initI18n2(dom.window.chrome, 'en');

    testUtil.options.header($).clickExport();
  });

  it('i18n label', () => {
    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  describe('exported json', () => {
    it('version should be current', () => {
      const json = testUtil.options.exportForm($).json();

      assert.strictEqual(json.version, testUtil.currentVersion());
    });

    it('without pattern data', () => {
      const json = testUtil.options.exportForm($).json();

      assert.deepStrictEqual(json.pattern, []);
    });

    it('with pattern data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);
      testUtil.options.header($).clickExport();

      const json = testUtil.options.exportForm($).json();

      assert.strictEqual(json.pattern.length, 1);
      assert.deepStrictEqual(json.pattern[0], testUtil.makePatternItem({}));
    });
  });
});
