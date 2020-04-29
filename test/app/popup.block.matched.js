const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.block.matched');
const testUtil = require('../../test_lib/util');

describe('popup.block.matched', function () {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    SUT.show();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('i18n', function () {
    it('status label', function () {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page span').eq(0);

      assert.strictEqual($element.text(), 'Status');
    });

    it('enabled label', function () {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page label').eq(0);

      assert.strictEqual($element.text(), 'Enabled');
    });
  });

  describe('initial state of status checkbox', function () {
    it('pattern matched and status is 0', function () {
      testUtil.chrome.popupTabsQueryChain('https://foo.example.com/page');
      testUtil.chrome.popupFindChain(testUtil.chrome.createTab({
        id: 10001,
        url: 'https://foo.example.com/page',
      }), testUtil.makeFoundItem({
        url: 'foo.example.com',
        status: 0,
      }));

      assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), false);
    });

    it('pattern matched and status is 1', function () {
      testUtil.chrome.popupTabsQueryChain('https://foo.example.com/page');
      testUtil.chrome.popupFindChain(testUtil.chrome.createTab({
        id: 10002,
        url: 'https://foo.example.com/page',
      }), testUtil.makeFoundItem({
        url: 'foo.example.com',
        status: 1,
      }));

      assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), true);
    });
  });
});
