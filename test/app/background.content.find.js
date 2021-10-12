const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.content.find');
const testUtil = require('../../test_lib/util');

describe('background.content.find', () => {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
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
  after(testUtil.background.after);

  it('pattern not matched', () => {
    const res = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.contentFindDispatch('https://www.example.com/', 10001, res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.ok(testUtil.chrome.setBadgeTextCalledWith('', 10001));
    assert.strictEqual(data.matched, false);
    assert.strictEqual(data.data, null);
  });

  it('patten matched and status is 1', () => {
    const res = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.contentFindDispatch('https://domain1.example.com/page', 10002, res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.ok(testUtil.chrome.setBadgeTextCalledWith('ON', 10002));
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain1');
  });

  it('patten matched and status is 0', () => {
    const res = testUtil.chrome.sendResposne();

    SUT.listen();

    testUtil.chrome.contentFindDispatch('https://domain2.example.com/page', 10003, res.callback);

    /** @type {FindResult} */
    const data = res.data();
    assert.ok(testUtil.chrome.setBadgeTextCalledWith('OFF', 10003));
    assert.strictEqual(data.matched, true);
    assert.strictEqual(data.data.message, 'domain2');
  });
});
