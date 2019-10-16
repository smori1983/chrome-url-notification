const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/content.tab');
const testUtil = require('../../test_lib/util');

/**
 * @param {string} displayPosition
 * @param {number} status
 */
const tabNotifyDispatch = function(displayPosition, status) {
  chrome.runtime.onMessage
    .dispatch({
      command: 'tab:notify:status',
      data: {
        item: testUtil.makeFoundItem({
          displayPosition: displayPosition,
          status: status,
        }),
      },
    });
};

describe('message.content.tab', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern matched and status is 0', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.02.html'));

    SUT.listen();

    tabNotifyDispatch('top', 0);

    // NOTE: default margin-top of <body> is 8px
    assert.strictEqual(testUtil.content.page().marginTop(), '8px');
    assert.strictEqual(testUtil.content.message().hidden(), true);
  });

  it('pattern matched and status is 1', function () {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.02.html'));

    SUT.listen();

    tabNotifyDispatch('bottom', 1);

    assert.strictEqual(testUtil.content.page().marginBottom(), '50px');
    assert.strictEqual(testUtil.content.message().shown(), true);
  });
});
