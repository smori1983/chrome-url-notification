const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('app.options.header', () => {
  /**
   * @type {jQuery}
   */
  let $;

  beforeEach(() => {
    const dom = testUtil.uiBase.initDom3(testUtil.getHtml('src/html/options.html'));

    $ = dom.window.jQuery;
  });

  it('version', () => {
    assert.strictEqual(testUtil.options.header($).version(), 'Ver. 1.2.3');
  });

  it('click add pattern', () => {
    testUtil.options.header($).clickAdd();

    assert.strictEqual(testUtil.options.patternForm($).shown(), true);
    assert.strictEqual(testUtil.options.exportForm($).shown(), false);
    assert.strictEqual(testUtil.options.importForm($).shown(), false);
  });

  it('click export', () => {
    testUtil.options.header($).clickExport();

    assert.strictEqual(testUtil.options.patternForm($).shown(), false);
    assert.strictEqual(testUtil.options.exportForm($).shown(), true);
    assert.strictEqual(testUtil.options.importForm($).shown(), false);
  });

  it('click import', () => {
    testUtil.options.header($).clickImport();

    assert.strictEqual(testUtil.options.patternForm($).shown(), false);
    assert.strictEqual(testUtil.options.exportForm($).shown(), false);
    assert.strictEqual(testUtil.options.importForm($).shown(), true);
  });
});
