const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/content.find');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.message.content.find', () => {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern not matched', () => {
    SUT.sendMessage(pageInfoFactory.init().get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: null,
      });

    assert.strictEqual(testUtil.content.message().exists(), false);
  });

  it('pattern matched and status is 0', () => {
    SUT.sendMessage(pageInfoFactory.init().get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual(testUtil.content.message().hidden(), true);
  });

  it('pattern matched and status is 1', () => {
    SUT.sendMessage(pageInfoFactory.init().get());

    testUtil.chrome.contentFindMessage()
      .req({
        url: 'https://example.com/',
      })
      .res({
        item: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual(testUtil.content.message().shown(), true);
  });
});
