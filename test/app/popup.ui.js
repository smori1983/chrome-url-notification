const { describe, before, beforeEach, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.ui');
const testUtil = require('../../test_lib/util');

describe('app.popup.ui', () => {
  before(testUtil.uiBase.initI18n('en'));
  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    const $ = require('jquery');
    SUT.init($);
  });

  describe('common menu', () => {
    it('link to options page should be shown', () => {
      const $ = require('jquery');
      const $link = $('#link_options a');

      assert.strictEqual($link.length, 1);
      assert.strictEqual($link.eq(0).text(), 'Options');
    });

    it('click link to options page', () => {
      const path = 'chrome-extension://xxx/html/options.html';

      chrome.runtime.getURL
        .withArgs('html/options.html')
        .returns(path);

      const $ = require('jquery');
      const $link = $('#link_options a').eq(0);

      $link.trigger('click');

      assert.ok(testUtil.chrome.tabsCreateCalledWith(path));
    });
  });

  describe('matched menu', () => {
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
});
