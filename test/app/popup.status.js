const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.status');
const testUtil = require('../../test_lib/util');

describe('popup', () => {
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

      testUtil.chrome.popupUpdateStatusChain(10001, 'https://example.com/', 0, result);

      SUT.updateStatus(10001, 'https://example.com/', 0);

      assert.ok(testUtil.chrome.popupTabNotifyStatusShould(10001, result, 0));
    });

    it('update with 1', () => {
      /** @type {FindResult} */
      const result = {
        matched: true,
        data: testUtil.makeFoundItem({
          url: 'https://example.com/',
          status: 1,
        }),
      };

      testUtil.chrome.popupUpdateStatusChain(10002, 'https://example.net/', 1, result);

      SUT.updateStatus(10002, 'https://example.net/', 1);

      assert.ok(testUtil.chrome.popupTabNotifyStatusShould(10002, result, 1));
    });
  });
});
