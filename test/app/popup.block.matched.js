const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.block.matched');
const testUtil = require('../../test_lib/util');

describe('app.popup.block.matched', () => {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    SUT.show();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('i18n', () => {
    it('status label', () => {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page span').eq(0);

      assert.strictEqual($element.text(), 'Status');
    });

    it('enabled label', () => {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page label').eq(0);

      assert.strictEqual($element.text(), 'Enabled');
    });
  });

  describe('initial state of status checkbox', () => {
    it('pattern matched and status is 0', () => {
      testUtil.chrome.popupTabsQuery()
        .req({})
        .res({
          url: 'https://foo.example.com/page',
        });
      testUtil.chrome.popupFindMessage()
        .req({
          tab: testUtil.chrome.createTab({
            id: 10001,
            url: 'https://foo.example.com/page',
          }),
        })
        .res({
          item: testUtil.makeFoundItem({
            url: 'foo.example.com',
            status: 0,
          }),
        });

      assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), false);
    });

    it('pattern matched and status is 1', () => {
      testUtil.chrome.popupTabsQuery()
        .req({})
        .res({
          url: 'https://foo.example.com/page',
        });
      testUtil.chrome.popupFindMessage()
        .req({
          tab: testUtil.chrome.createTab({
            id: 10002,
            url: 'https://foo.example.com/page',
          }),
        })
        .res({
          item: testUtil.makeFoundItem({
            url: 'foo.example.com',
            status: 1,
          }),
        });

      assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), true);
    });
  });
});
