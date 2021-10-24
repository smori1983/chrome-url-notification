const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const contentFind = require('../../src/js/app/content.find');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.content.ui', () => {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('mouseover (test for coverage)', () => {
    contentFind.sendMessage(pageInfoFactory.init().get());

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

    assert.strictEqual(testUtil.content.message().shown(), true);

    testUtil.content.message().mouseover();
  });

  it('mouseout (test for coverage)', () => {
    contentFind.sendMessage(pageInfoFactory.init().get());

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

    assert.strictEqual(testUtil.content.message().shown(), true);

    testUtil.content.message().mouseout();
  });
});
