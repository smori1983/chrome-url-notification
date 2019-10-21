const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/popup.find');
const testUtil = require('../../test_lib/util');

describe('message.popup.find', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern not matched', function() {
    const tab = testUtil.chrome.createTab({
      id: 10001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, null);

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), false);
  });

  it('pattern matched and status is 0', function() {
    const tab = testUtil.chrome.createTab({
      id: 20001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);
  });

  it('pattern matched and status is 0, then enable', function() {
    const tab = testUtil.chrome.createTab({
      id: 20002,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusShould(20002, 'https://example.com/', 1));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);
  });

  it('pattern matched status is 1', function() {
    const tab = testUtil.chrome.createTab({
      id: 30001,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);
  });

  it('pattern matched and status is 1, then disable', function() {
    const tab = testUtil.chrome.createTab({
      id: 30002,
      url: 'https://example.com/',
    });

    SUT.sendMessage(tab);

    testUtil.chrome.popupFindChain(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(testUtil.chrome.popupUpdateStatusShould(30002, 'https://example.com/', 0));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);
  });
});
