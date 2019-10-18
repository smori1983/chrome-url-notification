const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.find');
const testUtil = require('../../test_lib/util');

const responseChecker = function() {
  /** @type {FindResult} */
  let response;

  return {
    /**
     * @param {FindResult} res
     */
    callback: function(res) {
      response = res;
    },
    /**
     * @returns {FindResult}
     */
    response: function() {
      return response;
    },
  };
};

describe('background.content.find', function () {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  beforeEach(function () {
    testUtil.setUpStorage(testUtil.currentVersion(), [
      testUtil.makePatternItem({
        url: 'domain1.example.com',
        msg: 'domain1',
        status: 1,
      }),
      testUtil.makePatternItem({
        url: 'domain2.example.com',
        msg: 'domain2',
        status: 0,
      }),
    ]);
  });
  after(testUtil.background.after);

  it('pattern not matched', function () {
    const checker = responseChecker();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://www.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, false);
    assert.strictEqual(checker.response().data, null);
  });

  it('pattern matched and status is 1', function () {
    const checker = responseChecker();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://domain1.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain1');
  });

  it('pattern matched and status is 0', function () {
    const checker = responseChecker();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://domain2.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain2');
  });
});
