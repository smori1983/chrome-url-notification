const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/content.find');
const testUtil = require('../../test_lib/util');

/**
 * @param {string} url
 * @param {(FoundItem|null)} item
 */
const contentFindMessage = function(url, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'content_scripts:find',
      data: {
        url: url,
      },
    })
    .callArgWith(1, {
      matched: item !== null,
      data: item,
    })
};

describe('message.content.find', function () {
  before(testUtil.message.before);
  beforeEach(testUtil.message.beforeEach);
  afterEach(testUtil.message.afterEach);
  after(testUtil.message.after);

  it('pattern not matched', function() {
    testUtil.message.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });

    SUT.sendMessage();

    contentFindMessage('https://example.com/', null);

    assert.strictEqual(testUtil.content.message().exists(), false);
  });

  it('pattern matched and status is 0', function () {
    testUtil.message.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });

    SUT.sendMessage();

    contentFindMessage('https://example.com/', testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.content.message().hidden(), true);
  });

  it('pattern matched and status is 1', function () {
    testUtil.message.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });

    SUT.sendMessage();

    contentFindMessage('https://example.com/', testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.content.message().shown(), true);
  });
});
