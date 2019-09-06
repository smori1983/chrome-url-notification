const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../../src/js/app/main').popup;
const chrome = require('sinon-chrome');

describe('popup', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
  });

  after(function () {
    delete global.chrome;
  });

  describe('updateStatus', function () {
    it('update with 0', function () {
      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:update:status',
          data: {
            url: 'https://example.com/',
            status: 0,
            tabId: 10001,
          },
        })
        .callsArgWith(1, { status: 0});

      SUT.updateStatus(10001, 'https://example.com/', 0);

      assert.ok(
        chrome.tabs.sendMessage
          .withArgs(10001, {
            command: 'tab:notify:status',
            data: {
              status: 0,
            },
          })
          .calledOnce
      );
    });

    it('update with 1', function () {
      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:update:status',
          data: {
            url: 'https://example.net/',
            status: 1,
            tabId: 10002,
          },
        })
        .callsArgWith(1, { status: 1});

      SUT.updateStatus(10002, 'https://example.net/', 1);

      assert.ok(
        chrome.tabs.sendMessage
          .withArgs(10002, {
            command: 'tab:notify:status',
            data: {
              status: 1,
            },
          })
          .calledOnce
      );
    });
  });
});
