const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.update.status');
const chrome = require('sinon-chrome');
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

/**
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @param {function} callback
 */
const updateStatusDispatch = function (tabId, url, status, callback) {
  chrome.runtime.onMessage
    .dispatch(
      {
        command: 'browser_action:update:status',
        data: {
          url: url,
          status: status,
          tabId: tabId,
        },
      },
      {},
      callback
    );
};

/**
 * @param {string} text
 * @param {number} tabId
 * @returns {boolean}
 */
const setBadgeTextShould = function(text, tabId) {
  return chrome.browserAction.setBadgeText
    .withArgs({
      text: text,
      tabId: tabId,
    })
    .calledOnce;
};

describe('background.popup.update.status', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    testUtil.setUpStorage('3', [
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

    chrome.flush();
  });

  after(function () {
    delete (global.chrome);
  });

  it('status is 1, then disabled', function () {
    const checker = responseChecker();

    SUT.listen();

    updateStatusDispatch(10001, 'https://domain1.example.com/', 0, checker.callback);

    assert.ok(setBadgeTextShould('OFF', 10001));

    assert.strictEqual(checker.response().item.status, 0);
    assert.strictEqual(checker.response().status, 0);
  });

  it('status is 0, then enabled', function () {
    const checker = responseChecker();

    SUT.listen();

    updateStatusDispatch(10002, 'https://domain2.example.com/', 1, checker.callback);

    assert.ok(setBadgeTextShould('ON', 10002));

    assert.strictEqual(checker.response().item.status, 1);
    assert.strictEqual(checker.response().status, 1);
  });
});