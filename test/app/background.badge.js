const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.badge');
const chrome = require('sinon-chrome');

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

describe('app.badge', function() {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
  });

  after(function () {
    delete global.chrome;
  });

  it('draw - matched and enabled', function () {
    SUT.draw(10001, true, 1);

    assert.ok(setBadgeTextShould('ON', 10001));
  });

  it('draw - matched and disabled', function () {
    SUT.draw(10002, true, 0);

    assert.ok(setBadgeTextShould('OFF', 10002));
  });

  it('draw - not matched', function () {
    SUT.draw(10003, false, null);

    assert.ok(setBadgeTextShould('', 10003));
  });

  it('draw - when not matched status is not used', function () {
    SUT.draw(10004, false, 1);

    assert.ok(setBadgeTextShould('', 10004));
  });
});
