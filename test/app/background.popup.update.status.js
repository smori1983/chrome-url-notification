const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const Storage = require('../../src/js/notification/storage');
const SUT = require('../../src/js/app/background.popup.update.status');
const testUtil = require('../../test_lib/util');

describe('app.background.popup.update.status', () => {
  /**
   * @type {Storage}
   */
  let storage;

  testUtil.chromeBackground.registerHooks();
  beforeEach(() => {
    storage = new Storage();

    testUtil.initStorage(testUtil.currentVersion().toString(), [
      testUtil.makePatternItem({
        url: 'domain1.example.com',
        status: 1,
      }),
      testUtil.makePatternItem({
        url: 'domain2.example.com',
        status: 0,
      }),
    ]);
  });

  it('status is 1, then disable', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupUpdateStatusDispatch(10001, 'domain1.example.com', 0, res.callback);

    /** @type {MessageBrowserActionUpdateStatusResponse} */
    const data = res.data();
    assert.ok(testUtil.chromeBackground.setBadgeTextCalledWith('OFF', 10001));
    assert.strictEqual(data.item.status, 0);
    assert.strictEqual(data.status, 0);

    const pattern = storage.find('domain1.example.com');
    assert.strictEqual(pattern.status, 0);
  });

  it('status is 0, then enable', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupUpdateStatusDispatch(10002, 'domain2.example.com', 1, res.callback);

    /** @type {MessageBrowserActionUpdateStatusResponse} */
    const data = res.data();
    assert.ok(testUtil.chromeBackground.setBadgeTextCalledWith('ON', 10002));
    assert.strictEqual(data.item.status, 1);
    assert.strictEqual(data.status, 1);

    const pattern = storage.find('domain2.example.com');
    assert.strictEqual(pattern.status, 1);
  });

  it('invoked for non-existing pattern', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupUpdateStatusDispatch(20001, 'xxx.example.com', 1, res.callback);

    /** @type {MessageBrowserActionUpdateStatusResponse} */
    const data = res.data();
    assert.ok(testUtil.chromeBackground.setBadgeTextCalledWith('', 20001));
    assert.strictEqual(data.item, null);
    assert.strictEqual(data.status, 1);
  });

  it('sent status is invalid - currently invalid status value will be carried but data will not be updated', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupUpdateStatusDispatch(10003, 'domain1.example.com', 9, res.callback);

    /** @type {MessageBrowserActionUpdateStatusResponse} */
    const data = res.data();
    assert.ok(testUtil.chromeBackground.setBadgeTextCalledWith('', 10003));
    assert.strictEqual(data.item.status, 9);
    assert.strictEqual(data.status, 9);

    const pattern = storage.find('domain1.example.com');
    assert.strictEqual(pattern.status, 1);
  });
});
