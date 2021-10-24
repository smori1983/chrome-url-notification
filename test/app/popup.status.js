const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.status');
const testUtil = require('../../test_lib/util');

describe('app.popup.status', () => {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  after(testUtil.uiBase.after);

  describe('updateStatus', () => {
    it('update with 0', () => {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'https://example.com/',
          status: 0,
        }),
      };

      testUtil.chrome.popupUpdateStatus()
        .req({
          tabId: 10001,
          url: 'https://example.com/',
          status: 0,
        })
        .res({
          item: result,
        });

      SUT.updateStatus(10001, 'https://example.com/', 0);

      assert.ok(testUtil.chrome.popupTabNotifyStatusCalledWith(10001, result, 0));
    });

    it('update with 1', () => {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'https://example.net/',
          status: 1,
        }),
      };

      testUtil.chrome.popupUpdateStatus()
        .req({
          tabId: 10002,
          url: 'https://example.net/',
          status: 1,
        })
        .res({
          item: result,
        });

      SUT.updateStatus(10002, 'https://example.net/', 1);

      assert.ok(testUtil.chrome.popupTabNotifyStatusCalledWith(10002, result, 1));
    });
  });
});
