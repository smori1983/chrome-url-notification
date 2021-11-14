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

  let options;

  beforeEach(() => {
    const dom = testUtil.uiBase.initOptions('src/html/options.html');

    storage = new Storage(dom.window.localStorage);
    $ = dom.window.jQuery;

    testUtil.uiBase.i18n(dom.window.chrome, 'en');

    options = new testUtil.Options($);
  });

  it('i18n label', () => {
    options.header().clickExport();

    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  describe('exported json', () => {
    it('version should be current', () => {
      options.header().clickExport();

      const json = options.exportForm().json();

      assert.strictEqual(json.version, testUtil.currentVersion());
    });

    it('without pattern data', () => {
      options.header().clickExport();

      const json = options.exportForm().json();

      assert.deepStrictEqual(json.pattern, []);
    });

    it('with pattern data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);
      options.header().clickExport();

      const json = options.exportForm().json();

      assert.strictEqual(json.pattern.length, 1);
      assert.deepStrictEqual(json.pattern[0], testUtil.makePatternItem({}));
    });
  });
});
