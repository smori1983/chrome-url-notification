const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../../src/js/app/main');
const chrome = require('sinon-chrome');

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
    SUT.badge.draw(12345, true, 1);

    assert.ok(
      chrome.browserAction.setBadgeText
        .withArgs({
          text: 'ON',
          tabId: 12345,
        })
        .calledOnce
    );
  });

  it('draw - matched and disabled', function () {
    SUT.badge.draw(12345, true, 0);

    assert.ok(
      chrome.browserAction.setBadgeText
        .withArgs({
          text: 'OFF',
          tabId: 12345,
        })
        .calledOnce
    );
  });

  it('draw - not matched', function () {
    SUT.badge.draw(12345, false, null);

    assert.ok(
      chrome.browserAction.setBadgeText
        .withArgs({
          text: '',
          tabId: 12345,
        })
        .calledOnce
    );
  });

  it('draw - when not matched status is not used', function () {
    SUT.badge.draw(12345, false, 1);

    assert.ok(
      chrome.browserAction.setBadgeText
        .withArgs({
          text: '',
          tabId: 12345,
        })
        .calledOnce
    );
  });
});
