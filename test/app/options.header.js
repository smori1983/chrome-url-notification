const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('app.options.header', () => {
  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
  });

  it('version', () => {
    SUT.show();

    assert.strictEqual(testUtil.options.header().version(), 'Ver. 1.2.3');
  });

  it('click add pattern', () => {
    SUT.show();

    testUtil.options.header().clickAdd();

    assert.strictEqual(testUtil.options.patternForm().shown(), true);
    assert.strictEqual(testUtil.options.exportForm().shown(), false);
    assert.strictEqual(testUtil.options.importForm().shown(), false);
  });

  it('click export', () => {
    SUT.show();

    testUtil.options.header().clickExport();

    assert.strictEqual(testUtil.options.patternForm().shown(), false);
    assert.strictEqual(testUtil.options.exportForm().shown(), true);
    assert.strictEqual(testUtil.options.importForm().shown(), false);
  });

  it('click import', () => {
    SUT.show();

    testUtil.options.header().clickImport();

    assert.strictEqual(testUtil.options.patternForm().shown(), false);
    assert.strictEqual(testUtil.options.exportForm().shown(), false);
    assert.strictEqual(testUtil.options.importForm().shown(), true);
  });
});
