const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Content = testUtil.Content;

describe('app.message.content.find', () => {
  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Content}
   */
  let content;

  beforeEach(() => {
    const dom = testUtil.dom.initContentScript('test_resource/html/content.03.html', {
      url: 'https://example.com/',
    });

    chrome = new ChromeMock(dom.window.chrome);
    content = new Content(dom.window.jQuery);
  });

  it('pattern not matched', () => {
    chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: null,
      });

    assert.strictEqual(content.message().exists(), false);
  });

  it('pattern matched and status is 0', () => {
    chrome.contentFindMessage()
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
    chrome.contentFindMessage()
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
