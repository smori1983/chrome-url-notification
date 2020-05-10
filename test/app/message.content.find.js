const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/content.find');
const pageInfo = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('message.content.find', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.01.html'), {
      url: 'https://example.com/',
    });
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern not matched', function() {
    SUT.sendMessage(pageInfo.init().get());

    testUtil.chrome.contentFindChain('https://example.com/', null);

    assert.strictEqual(testUtil.content.message().exists(), false);
  });

  it('pattern matched and status is 0', function () {
    SUT.sendMessage(pageInfo.init().get());

    testUtil.chrome.contentFindChain('https://example.com/', testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.content.message().hidden(), true);
  });

  it('pattern matched and status is 1', function () {
    SUT.sendMessage();

    testUtil.chrome.contentFindChain('https://example.com/', testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.content.message().shown(), true);
  });
});
