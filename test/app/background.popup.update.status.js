const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.update.status');
const testUtil = require('../../test_lib/util');

const responseChecker = function() {
  let response;

  return {
    callback: function(res) {
      response = res;
    },
    response: function() {
      return response;
    },
  };
};

describe('background.popup.update.status', function () {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  beforeEach(function () {
    testUtil.setUpStorage(testUtil.currentVersion(), [
      {
        url: 'https://domain1.example.com/',
        msg: 'domain1',
        backgroundColor: '111111',
        displayPosition: 'bottom',
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

  it('status is 1, then disabled', function () {
    const checker = responseChecker();

    SUT.listen();

    testUtil.chrome.popupUpdateStatusDispatch(10001, 'https://domain1.example.com/', 0, checker.callback);

    assert.ok(testUtil.chrome.setBadgeTextShould('OFF', 10001));

    assert.strictEqual(checker.response().item.status, 0);
    assert.strictEqual(checker.response().status, 0);
  });

  it('status is 0, then enabled', function () {
    const checker = responseChecker();

    SUT.listen();

    testUtil.chrome.popupUpdateStatusDispatch(10002, 'https://domain2.example.com/', 1, checker.callback);

    assert.ok(testUtil.chrome.setBadgeTextShould('ON', 10002));

    assert.strictEqual(checker.response().item.status, 1);
    assert.strictEqual(checker.response().status, 1);
  });
});
