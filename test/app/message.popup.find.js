const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.find');
const testUtil = require('../../test_lib/util');

/**
 * @param {chrome.tabs.Tab} tab
 * @param {(FoundItem|null)} item
 */
const popupFindMessage = function(tab, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:find',
      data: {
        url: tab.url,
      },
    })
    .callArgWith(1, {
      matched: item !== null,
      data: item,
    });
};

/**
 * @param {number} tabId
 * @param {string} url
 * @param {number} status
 * @returns {boolean}
 */
const sendMessageShould = function(tabId, url, status) {
  return chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:update:status',
      data: {
        url: url,
        status: status,
        tabId: tabId,
      },
    })
    .calledOnce;
};

describe('message.popup.find', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('pattern not matched', function() {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 10001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, null);

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), false);
  });

  it('pattern matched and status is 0', function() {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 20001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);
  });

  it('pattern matched and status is 0, then enable', function() {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 20002,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(sendMessageShould(20002, 'https://example.com/', 1));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);
  });

  it('pattern matched status is 1', function() {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 30001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);
  });

  it('pattern matched and status is 1, then disable', function() {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 30002,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), true);

    testUtil.popup.matchedBlock().clickStatus();

    assert.ok(sendMessageShould(30002, 'https://example.com/', 0));

    assert.strictEqual(testUtil.popup.matchedBlock().shown(), true);
    assert.strictEqual(testUtil.popup.matchedBlock().statusIsEnabled(), false);
  });
});
