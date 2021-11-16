const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;

describe('app.message.popup.find', () => {
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

  it('pattern not matched', () => {
    const tab = testUtil.chrome.createTab({
      id: 10001,
      url: 'https://example.com/',
    });

    chrome.popupTabsQuery()
      .req({})
      .res({
        id: 10001,
        url: 'https://example.com/',
      });

    chrome.popupFindMessage()
      .req({
        tab: tab,
      })
      .res({
        item: null,
      });

    assert.strictEqual(popup.matchedBlock().shown(), false);
  });

  it('pattern matched and status is 0', () => {
    const tab = testUtil.chrome.createTab({
      id: 20001,
      url: 'https://example.com/',
    });

    chrome.popupTabsQuery()
      .req({})
      .res({
        id: 20001,
        url: 'https://example.com/',
      });

    chrome.popupFindMessage()
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), false);
  });

  it('pattern matched and status is 0, then enable', () => {
    const tab = testUtil.chrome.createTab({
      id: 20002,
      url: 'https://example.com/',
    });

    chrome.popupTabsQuery()
      .req({})
      .res({
        id: 20002,
        url: 'https://example.com/',
      });

    chrome.popupFindMessage()
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), false);

    popup.matchedBlock().clickStatus();

    assert.ok(chrome.popupUpdateStatusCalledWith(20002, 'https://example.com/', 1));

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), true);
  });

  it('pattern matched and status is 1', () => {
    const tab = testUtil.chrome.createTab({
      id: 30001,
      url: 'https://example.com/',
    });

    chrome.popupTabsQuery()
      .req({})
      .res({
        id: 30001,
        url: 'https://example.com/',
      });

    chrome.popupFindMessage()
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), true);
  });

  it('pattern matched and status is 1, then disable', () => {
    const tab = testUtil.chrome.createTab({
      id: 30002,
      url: 'https://example.com/',
    });

    chrome.popupTabsQuery()
      .req({})
      .res({
        id: 30002,
        url: 'https://example.com/',
      });

    chrome.popupFindMessage()
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), true);

    popup.matchedBlock().clickStatus();

    assert.ok(chrome.popupUpdateStatusCalledWith(30002, 'https://example.com/', 0));

    assert.strictEqual(popup.matchedBlock().shown(), true);
    assert.strictEqual(popup.matchedBlock().statusEnabled(), false);
  });
});
