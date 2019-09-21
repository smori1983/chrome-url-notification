const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../../src/js/app/popup');
const chrome = require('sinon-chrome');

/**
 * @param {number} tabId
 * @param {FindResult} item
 * @param {number} status
 * @returns {boolean}
 */
const sendMessageForTabShould = function (tabId, item, status) {
  return chrome.tabs.sendMessage
    .withArgs(tabId, {
      command: 'tab:notify:status',
      data: {
        item: item,
        status: status,
      },
    })
    .calledOnce;
};

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
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: {
          url: 'https://example.com/',
          message: 'message',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 0,
        },
      };

      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:update:status',
          data: {
            url: 'https://example.com/',
            status: 0,
            tabId: 10001,
          },
        })
        .callsArgWith(1, { item: result, status: 0});

      SUT.updateStatus(10001, 'https://example.com/', 0);

      assert.ok(sendMessageForTabShould(10001, result, 0));
    });

    it('update with 1', function () {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: {
          url: 'https://example.com/',
          message: 'message',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 1,
        },
      };

      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:update:status',
          data: {
            url: 'https://example.net/',
            status: 1,
            tabId: 10002,
          },
        })
        .callsArgWith(1, { item: result, status: 1});

      SUT.updateStatus(10002, 'https://example.net/', 1);

      assert.ok(sendMessageForTabShould(10002, result, 1));
    });
  });
});
