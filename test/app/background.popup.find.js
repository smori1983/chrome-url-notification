const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.find');
const testUtil = require('../../test_lib/util');

describe('app.background.popup.find', () => {
  testUtil.chromeBackground.registerHooks();
  beforeEach(() => {
    testUtil.initStorage(testUtil.currentVersion().toString(), [
      testUtil.makePatternItem({
        url: 'domain1.example.com',
        msg: 'domain1',
        status: 1,
      }),
      testUtil.makePatternItem({
        url: 'domain2.example.com',
        msg: 'domain2',
        status: 0,
      }),
    ]);
  });

  it('pattern not matched', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupFindDispatch('https://www.example.com/', res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.strictEqual(data.matched, false);
    assert.strictEqual(data.data, null);
  });

  it('pattern matched and status is 1', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupFindDispatch('https://domain1.example.com/', res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain1');
  });

  it('pattern matched and status is 0', () => {
    const res = testUtil.chromeBackground.sendResponse();

    SUT.listen();

    testUtil.chromeBackground.popupFindDispatch('https://domain2.example.com/', res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain2');
  });
});
