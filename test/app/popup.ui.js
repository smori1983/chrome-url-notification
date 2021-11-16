const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;

describe('app.popup.ui', () => {
  /**
   * @type {jQuery}
   */
  let $;

  /**
   * @type {ChromeMock}
   */
  let chrome;

  let popup;

  beforeEach(() => {
    const dom = testUtil.uiBase.initPopup('src/html/popup.html');

    chrome = new ChromeMock(dom.window.chrome);
    $ = dom.window.jQuery;

    testUtil.uiBase.i18n(dom.window.chrome, 'en');

    popup = new testUtil.Popup($);
    popup.init();
  });

  describe('common menu', () => {
    it('link to options page should be shown', () => {
      const $link = $('#link_options a');

      assert.strictEqual($link.length, 1);
      assert.strictEqual($link.eq(0).text(), 'Options');
    });

    it('click link to options page', () => {
      const path = 'chrome-extension://xxx/html/options.html';

      chrome.getURL('html/options.html', path);

      const $link = $('#link_options a').eq(0);

      $link.trigger('click');

      assert.ok(chrome.tabsCreateCalledWith(path));
    });
  });

  describe('matched menu', () => {
    describe('i18n', () => {
      it('status label', () => {
        const $element = $('#block_for_matched_page span').eq(0);

        assert.strictEqual($element.text(), 'Status');
      });

      it('enabled label', () => {
        const $element = $('#block_for_matched_page label').eq(0);

        assert.strictEqual($element.text(), 'Enabled');
      });
    });

    describe('initial state of status checkbox', () => {
      it('pattern matched and status is 0', () => {
        chrome.popupTabsQuery()
          .req({})
          .res({
            url: 'https://foo.example.com/page',
          });
        chrome.popupFindMessage()
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

        assert.strictEqual(popup.matchedBlock().statusEnabled(), false);
      });

      it('pattern matched and status is 1', () => {
        chrome.popupTabsQuery()
          .req({})
          .res({
            url: 'https://foo.example.com/page',
          });
        chrome.popupFindMessage()
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

        assert.strictEqual(popup.matchedBlock().statusEnabled(), true);
      });
    });
  });
});
