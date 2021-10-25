const { describe, before, beforeEach, it } = require('mocha');
const assert = require('assert');
const header = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('app.options.exportForm', () => {
  before(testUtil.uiBase.initI18n('en'));
  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
    header.show();
    testUtil.options.header().clickExport();
  });

  it('i18n label', () => {
    const $ = require('jquery');

    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  describe('exported json', () => {
    it('version should be current', () => {
      const json = testUtil.options.exportForm().json();

      assert.strictEqual(json.version, testUtil.currentVersion());
    });

    it('without pattern data', () => {
      const json = testUtil.options.exportForm().json();

      assert.deepStrictEqual(json.pattern, []);
    });

    it('with pattern data', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);
      testUtil.options.header().clickExport();

      const json = testUtil.options.exportForm().json();

      assert.strictEqual(json.pattern.length, 1);
      assert.deepStrictEqual(json.pattern[0], testUtil.makePatternItem({}));
    });
  });
});
