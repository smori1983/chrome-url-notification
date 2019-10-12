const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.header', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('version', function () {
    SUT.show();

    assert.strictEqual(testUtil.options.header().version(), 'Ver. 1.2.3');
  });

  it('click add pattern', function () {
    SUT.show();

    testUtil.options.header().clickAdd();

    assert.strictEqual(testUtil.options.patternForm().shown(), true);
    assert.strictEqual(testUtil.options.exportForm().shown(), false);
    assert.strictEqual(testUtil.options.importForm().shown(), false);
  });

  it('click export', function () {
    SUT.show();

    testUtil.options.header().clickExport();

    assert.strictEqual(testUtil.options.patternForm().shown(), false);
    assert.strictEqual(testUtil.options.exportForm().shown(), true);
    assert.strictEqual(testUtil.options.importForm().shown(), false);
  });

  it('click import', function () {
    SUT.show();

    testUtil.options.header().clickImport();

    assert.strictEqual(testUtil.options.patternForm().shown(), false);
    assert.strictEqual(testUtil.options.exportForm().shown(), false);
    assert.strictEqual(testUtil.options.importForm().shown(), true);
  });
});
