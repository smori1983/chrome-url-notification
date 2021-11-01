const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/content.find');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.message.content.find', () => {
  /**
   * @type {Location}
   */
  let location;

  /**
   * @type {jQuery}
   */
  let $;

  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    const dom = testUtil.uiBase.initDom2(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });
    location = dom.window.location;
    $ = require('jquery')(dom.window);
  });

  it('pattern not matched', () => {
    SUT.findForPage($, pageInfoFactory.init(location, $).get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: null,
      });

    assert.strictEqual(testUtil.content.message($).exists(), false);
  });

  it('pattern matched and status is 0', () => {
    SUT.findForPage($, pageInfoFactory.init(location, $).get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(testUtil.content.message($).hidden(), true);
  });

  it('pattern matched and status is 1', () => {
    SUT.findForPage($, pageInfoFactory.init(location, $).get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(testUtil.content.message($).shown(), true);
  });
});
