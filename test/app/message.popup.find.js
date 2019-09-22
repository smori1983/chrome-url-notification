const { describe, before, beforeEach, after, it } = require('mocha');
const fs = require('fs');
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/popup.find');
const testUtil = require('../../test_lib/util');

const html = fs.readFileSync(__dirname + '/../../src/html/popup.html');

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
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
    delete require.cache[require.resolve('jquery')];
  });

  after(function () {
    delete (global.chrome);
  });

  it('pattern not matched', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 10001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, null);

    assert.strictEqual($('#block_for_matched_page').css('display'), 'none');
  });

  it('pattern matched and status is 0', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 20001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);
  });

  it('pattern matched and status is 0, then enable', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 20002,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 0,
    }));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);

    $('#pattern_status').trigger('click');

    assert.ok(sendMessageShould(20002, 'https://example.com/', 1));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), true);
  });

  it('pattern matched status is 1', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 30001,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), true);
  });

  it('pattern matched and status is 1, then disable', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    /** @type {chrome.tabs.Tab} */
    const tab = {
      id: 30002,
      url: 'https://example.com/',
    };

    SUT.sendMessage(tab);

    popupFindMessage(tab, testUtil.makeFoundItem({
      status: 1,
    }));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), true);

    $('#pattern_status').trigger('click');

    assert.ok(sendMessageShould(30002, 'https://example.com/', 0));

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);
  });
});
