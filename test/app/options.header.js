const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Options = testUtil.Options;

describe('app.options.header', () => {
  /**
   * @type {Options}
   */
  let options;

  beforeEach(() => {
    const dom = testUtil.dom.initOptions('src/html/options.html');

    options = new Options(dom.window.jQuery);
  });

  it('version', () => {
    assert.strictEqual(options.header().version(), 'Ver. 1.2.3');
  });

  it('click add pattern', () => {
    options.header().clickAdd();

    assert.strictEqual(options.patternForm().shown(), true);
    assert.strictEqual(options.exportForm().shown(), false);
    assert.strictEqual(options.importForm().shown(), false);
  });

  it('click export', () => {
    options.header().clickExport();

    assert.strictEqual(options.patternForm().shown(), false);
    assert.strictEqual(options.exportForm().shown(), true);
    assert.strictEqual(options.importForm().shown(), false);
  });

  it('click import', () => {
    options.header().clickImport();

    assert.strictEqual(options.patternForm().shown(), false);
    assert.strictEqual(options.exportForm().shown(), false);
    assert.strictEqual(options.importForm().shown(), true);
  });
});
