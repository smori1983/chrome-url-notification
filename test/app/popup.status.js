const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.status');
const chrome = require('sinon-chrome');
const testUtil = require('../../test_lib/util');

/**
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @param {FindResult} item
 */
const popupUpdateStatusMessage = function(tabId, url, status, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:update:status',
      data: {
        url: url,
        status: status,
        tabId: tabId,
      },
    })
    .callsArgWith(1, { item: item, status: status });
};

describe('popup', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  after(testUtil.uiBase.after);

  describe('updateStatus', function () {
    it('update with 0', function () {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'https://example.com/',
          status: 0,
        }),
      };

      popupUpdateStatusMessage(10001, 'https://example.com/', 0, result);

      SUT.updateStatus(10001, 'https://example.com/', 0);

      assert.ok(testUtil.chrome.popupTabNotifyStatusShould(10001, result, 0));
    });

    it('update with 1', function () {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'https://example.com/',
          status: 1,
        }),
      };

      popupUpdateStatusMessage(10002, 'https://example.net/', 1, result);

      SUT.updateStatus(10002, 'https://example.net/', 1);

      assert.ok(testUtil.chrome.popupTabNotifyStatusShould(10002, result, 1));
    });
  });
});
