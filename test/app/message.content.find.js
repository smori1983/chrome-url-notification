const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('app.message.content.find', () => {
  /**
   * @type {SinonChrome}
   */
  let chrome;

  /**
   * @type {jQuery}
   */
  let $;

  let content;

  beforeEach(() => {
    const dom = testUtil.uiBase.initContentScript('test_resource/html/content.03.html', {
      url: 'https://example.com/',
    });

    chrome = dom.window.chrome;
    $ = dom.window.jQuery;

    content = new testUtil.Content($);
  });

  it('pattern not matched', () => {
    testUtil.chrome.contentFindMessage(chrome)
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: null,
      });

    assert.strictEqual(content.message().exists(), false);
  });

  it('pattern matched and status is 0', () => {
    testUtil.chrome.contentFindMessage(chrome)
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(content.message().hidden(), true);
  });

  it('pattern matched and status is 1', () => {
    testUtil.chrome.contentFindMessage(chrome)
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(content.message().shown(), true);
  });
});
