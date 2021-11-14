const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('app.message.popup.find', () => {
  /**
   * @type {jQuery}
   */
  let $;

  /**
   * @type {SinonChrome}
   */
  let chrome;

  beforeEach(() => {
    const dom = testUtil.uiBase.initPopup(testUtil.getHtml('src/html/popup.html'));

    chrome = dom.window.chrome;
    $ = dom.window.jQuery;

    testUtil.uiBase.i18n(dom.window.chrome, 'en');

    testUtil.popup.init($);
  });

  it('pattern not matched', () => {
    const tab = testUtil.chrome.createTab({
      id: 10001,
      url: 'https://example.com/',
    });

    testUtil.chrome.popupTabsQuery(chrome)
      .req({})
      .res({
        id: 10001,
        url: 'https://example.com/',
      });

    testUtil.chrome.popupFindMessage(chrome)
      .req({
        tab: tab,
      })
      .res({
        item: null,
      });

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), false);
  });

  it('pattern matched and status is 0', () => {
    const tab = testUtil.chrome.createTab({
      id: 20001,
      url: 'https://example.com/',
    });

    testUtil.chrome.popupTabsQuery(chrome)
      .req({})
      .res({
        id: 20001,
        url: 'https://example.com/',
      });

    testUtil.chrome.popupFindMessage(chrome)
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), false);
  });

  it('pattern matched and status is 0, then enable', () => {
    const tab = testUtil.chrome.createTab({
      id: 20002,
      url: 'https://example.com/',
    });

    testUtil.chrome.popupTabsQuery(chrome)
      .req({})
      .res({
        id: 20002,
        url: 'https://example.com/',
      });

    testUtil.chrome.popupFindMessage(chrome)
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), false);

    testUtil.popup.matchedBlock($).clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusCalledWith(chrome, 20002, 'https://example.com/', 1));

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), true);
  });

  it('pattern matched and status is 1', () => {
    const tab = testUtil.chrome.createTab({
      id: 30001,
      url: 'https://example.com/',
    });

    testUtil.chrome.popupTabsQuery(chrome)
      .req({})
      .res({
        id: 30001,
        url: 'https://example.com/',
      });

    testUtil.chrome.popupFindMessage(chrome)
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), true);
  });

  it('pattern matched and status is 1, then disable', () => {
    const tab = testUtil.chrome.createTab({
      id: 30002,
      url: 'https://example.com/',
    });

    testUtil.chrome.popupTabsQuery(chrome)
      .req({})
      .res({
        id: 30002,
        url: 'https://example.com/',
      });

    testUtil.chrome.popupFindMessage(chrome)
      .req({
        tab: tab,
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), true);

    testUtil.popup.matchedBlock($).clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusCalledWith(chrome, 30002, 'https://example.com/', 0));

    assert.strictEqual(testUtil.popup.matchedBlock($).shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock($).statusEnabled(), false);
  });
});
