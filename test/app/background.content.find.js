const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.content.find');
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
 * @param {number} tabId
 * @param {function} callback
 */
const contentFindDispatch = function (url, tabId, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'content_scripts:find',
        data: {
          url: url,
        },
      },
      {
        tab: {
          id: tabId,
        },
      },
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
        displayPosition: 'bottom',
        status: 0,
      },
    ]);
  });
  after(testUtil.background.after);

  it('pattern not matched', function () {
    const checker = responseChecker();

    SUT.listen();

    contentFindDispatch('https://www.example.com/', 10001, checker.callback);

    assert.ok(testUtil.chrome.setBadgeTextShould('', 10001));
    assert.strictEqual(checker.response().matched, false);
    assert.strictEqual(checker.response().data, null);
  });

  it('patten matched and status is 1', function () {
    const checker = responseChecker();

    SUT.listen();

    contentFindDispatch('https://domain1.example.com/page', 10002, checker.callback);

    assert.ok(testUtil.chrome.setBadgeTextShould('ON', 10002));
    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain1');
  });

  it('patten matched and status is 0', function () {
    const checker = responseChecker();

    SUT.listen();

    contentFindDispatch('https://domain2.example.com/page', 10003, checker.callback);

    assert.ok(testUtil.chrome.setBadgeTextShould('OFF', 10003));
    assert.strictEqual(checker.response().matched, true);
    assert.strictEqual(checker.response().data.message, 'domain2');
  });
});
