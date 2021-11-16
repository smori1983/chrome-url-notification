const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Options = testUtil.Options;
const Storage = testUtil.Storage;

describe('app.options.exportForm', () => {
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
    options.header().clickExport();

    assert.strictEqual(options.exportForm().labelCopyButton(), 'Copy');
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
