const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.popup.find');
const testUtil = require('../../test_lib/util');

describe('background.content.find', () => {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  beforeEach(() => {
    testUtil.setUpStorage(testUtil.currentVersion().toString(), [
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
  after(testUtil.background.after);

  it('pattern not matched', () => {
    const sendResponse = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://www.example.com/', sendResponse.callback);

    /** @type {FindResult} */
    const data = sendResponse.data();
    assert.strictEqual(data.matched, false);
    assert.strictEqual(data.data, null);
  });

  it('pattern matched and status is 1', () => {
    const sendResponse = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://domain1.example.com/', sendResponse.callback);

    /** @type {FindResult} */
    const data = sendResponse.data();
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain1');
  });

  it('pattern matched and status is 0', () => {
    const sendResponse = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.popupFindDispatch('https://domain2.example.com/', sendResponse.callback);

    /** @type {FindResult} */
    const data = sendResponse.data();
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain2');
  });
});
