const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/options.exportForm');
const testUtil = require('../../test_lib/util');

describe('options.exportForm', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('i18n label', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    const $ = require('jquery');

    SUT.show();

    assert.strictEqual($('#js_export_copy').text(), 'Copy');
  });

  it('exported json - version is current', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    SUT.show();

    const json = testUtil.options.exportForm().json();

    assert.strictEqual(json.version, testUtil.currentVersion());
  });

  it('exported json - without pattern data', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    SUT.show();

    const json = testUtil.options.exportForm().json();

    assert.deepStrictEqual(json.pattern, []);
  });

  it('exported json - with pattern data', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));

    SUT.show();

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
