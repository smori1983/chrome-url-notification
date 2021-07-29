const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.find');
const testUtil = require('../../test_lib/util');

describe('message.popup.find', () => {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern not matched', () => {
    const tab = testUtil.chrome.createTab({
      id: 10001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, null);

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), false);
  });

  it('pattern matched and status is 0', () => {
    const tab = testUtil.chrome.createTab({
      id: 20001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), false);
  });

  it('pattern matched and status is 0, then enable', () => {
    const tab = testUtil.chrome.createTab({
      id: 20002,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), false);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusCalledWith(20002, 'https://example.com/', 1));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), true);
  });

  it('pattern matched and status is 1', () => {
    const tab = testUtil.chrome.createTab({
      id: 30001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), true);
  });

  it('pattern matched and status is 1, then disable', () => {
    const tab = testUtil.chrome.createTab({
      id: 30002,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), true);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusCalledWith(30002, 'https://example.com/', 0));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusEnabled(), false);
  });
});
