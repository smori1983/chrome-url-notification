const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('app.message.content.tab', () => {
  /**
   * @type {SinonChrome}
   */
  let chrome;

  let content;

  beforeEach(() => {
    const dom = testUtil.uiBase.initContentScript('test_resource/html/content.03.html', {
      url: 'https://example.com/',
    });

    chrome = dom.window.chrome;
    content = new testUtil.Content(dom.window.jQuery);
  });

  given([
    {displayPosition: 'top', marginTop: '0px', marginBottom: '0px'},
    {displayPosition: 'bottom', marginTop: '0px', marginBottom: '0px'},
  ]).it('pattern matched and status was changed from 1 to 0', (arg) => {
    testUtil.chrome.contentFindMessage(chrome)
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
          displayPosition: arg.displayPosition,
        }),
      });

    testUtil.chrome.contentTabNotifyStatusDispatch(chrome, arg.displayPosition, 0);

    assert.strictEqual(content.page().marginTop(), arg.marginTop);
    assert.strictEqual(content.page().marginBottom(), arg.marginBottom);
    assert.strictEqual(content.message().hidden(), true);
  });

  given([
    {displayPosition: 'top', marginTop: '50px', marginBottom: '0px'},
    {displayPosition: 'bottom', marginTop: '0px', marginBottom: '50px'},
  ]).it('pattern matched and status was changed from 0 to 1', (arg) => {
    testUtil.chrome.contentFindMessage(chrome)
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
          displayPosition: arg.displayPosition,
        }),
      });

    testUtil.chrome.contentTabNotifyStatusDispatch(chrome, arg.displayPosition, 1);

    assert.strictEqual(content.page().marginTop(), arg.marginTop);
    assert.strictEqual(content.page().marginBottom(), arg.marginBottom);
    assert.strictEqual(content.message().shown(), true);
  });
});
