const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;

describe('app.popup.status', () => {
  /**
   * @type {ChromeMock}
   */
  let chrome;

  let popup;

  beforeEach(() => {
    const dom = testUtil.uiBase.initPopup('src/html/popup.html');

    chrome = new ChromeMock(dom.window.chrome);

    testUtil.uiBase.i18n(dom.window.chrome, 'en');

    popup = new testUtil.Popup(dom.window.jQuery);
    popup.init();
  });

  describe('updateStatus', () => {
    it('update with 0', () => {
      chrome.popupTabsQuery()
        .req({})
        .res({
          id: 10001,
          url: 'example.com',
        });
      chrome.popupFindMessage()
        .req({
          tab: testUtil.chrome.createTab({
            id: 10001,
            url: 'example.com',
          }),
        })
        .res({
          item: testUtil.makeFoundItem({
            url: 'example.com',
            status: 1,
          }),
        });

      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'example.com',
          status: 0,
        }),
      };

      chrome.popupUpdateStatus()
        .req({
          tabId: 10001,
          url: 'example.com',
          status: 0,
        })
        .res({
          item: result,
        });

      popup.matchedBlock().clickStatus();

      assert.ok(chrome.popupTabNotifyStatusCalledWith(10001, result, 0));
    });

    it('update with 1', () => {
      chrome.popupTabsQuery()
        .req({})
        .res({
          id: 10002,
          url: 'example.com',
        });
      chrome.popupFindMessage()
        .req({
          tab: testUtil.chrome.createTab({
            id: 10002,
            url: 'example.com',
          }),
        })
        .res({
          item: testUtil.makeFoundItem({
            url: 'example.com',
            status: 0,
          }),
        });

      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'example.com',
          status: 1,
        }),
      };

      chrome.popupUpdateStatus()
        .req({
          tabId: 10002,
          url: 'example.com',
          status: 1,
        })
        .res({
          item: result,
        });

      popup.matchedBlock().clickStatus();

      assert.ok(chrome.popupTabNotifyStatusCalledWith(10002, result, 1));
    });
  });
});
