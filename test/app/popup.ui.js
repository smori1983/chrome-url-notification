const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Popup = testUtil.Popup;

describe('app.popup.ui', () => {
  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Popup}
   */
  let popup;

  beforeEach(() => {
    const dom = testUtil.uiBase.initPopup('src/html/popup.html');

    chrome = new ChromeMock(dom.window.chrome);
    chrome.i18n('en');

    popup = new Popup(dom.window.jQuery);
    popup.init();
  });

  describe('common menu', () => {
    it('link to options page should be shown', () => {
      assert.strictEqual(popup.commonBlock().labelOptionsLink(), 'Options');
    });

    it('click link to options page', () => {
      const path = 'chrome-extension://xxx/html/options.html';

      chrome.getURL('html/options.html', path);

      popup.commonBlock().clickOptionsLink();

      assert.ok(chrome.tabsCreateCalledWith(path));
    });
  });

  describe('matched menu', () => {
    describe('i18n', () => {
      it('status label', () => {
        assert.strictEqual(popup.matchedBlock().labelStatus(), 'Status');
      });

      it('enabled label', () => {
        assert.strictEqual(popup.matchedBlock().labelEnabled(), 'Enabled');
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
