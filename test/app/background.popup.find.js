const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.find');
const chrome = require('sinon-chrome');
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

/**
 * @param {string} url
 * @param {function} callback
 */
const popupFindDispatch = function (url, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'browser_action:find',
        data: {
          url: url,
        },
      },
      {},
      callback
    );
};

describe('background.content.find', function () {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  beforeEach(function () {
    testUtil.setUpStorage(testUtil.currentVersion(), [
      {
        url: 'https://domain1.example.com/',
        msg: 'domain1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'https://domain2.example.com/',
        msg: 'domain2',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 0,
      },
    ]);
  });
  after(testUtil.background.after);

  it('pattern not matched', function () {
    const checker = responseChecker();

    SUT.listen();

    popupFindDispatch('https://www.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, false);
    assert.strictEqual(checker.response().data, null);
  });

  it('pattern matched and status is 1', function () {
    const checker = responseChecker();

    SUT.listen();

    popupFindDispatch('https://domain1.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain1');
  });

  it('pattern matched and status is 0', function () {
    const checker = responseChecker();

    SUT.listen();

    popupFindDispatch('https://domain2.example.com/', checker.callback);

    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain2');
  });
});
