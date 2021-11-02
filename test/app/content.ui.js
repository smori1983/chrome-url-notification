const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const contentFind = require('../../src/js/app/content.find');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.content.ui', () => {
  /**
   * @type {jQuery}
   */
  let $;

  /**
   * @type {PageInfo}
   */
  let pageInfo;

  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    const dom = testUtil.uiBase.initDom2(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });
    $ = require('jquery')(dom.window);
    pageInfo = pageInfoFactory.init(dom.window.location, $).get();
  });

  it('mouseover (test for coverage)', () => {
    contentFind.findForPage($, pageInfo);

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
          displayPosition: 'top_left',
        }),
      });

    assert.strictEqual(testUtil.content.message($).shown(), true);

    testUtil.content.message($).mouseover();
  });

  it('mouseout (test for coverage)', () => {
    contentFind.findForPage($, pageInfo);

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
          displayPosition: 'top_left',
        }),
      });

    assert.strictEqual(testUtil.content.message($).shown(), true);

    testUtil.content.message($).mouseout();
  });
});
