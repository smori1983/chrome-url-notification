const { describe, before, beforeEach, after, it } = require('mocha');
const fs = require('fs');
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/popup.find');
const testUtil = require('../../test_lib/util');

const html = fs.readFileSync(__dirname + '/../../src/html/popup.html');

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

    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: tab.url,
        },
      })
      .callArgWith(1, {
        matched: false,
        data: null,
      });

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

    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: tab.url,
        },
      })
      .callArgWith(1, {
        matched: true,
        data: testUtil.makeFoundItem({
          status: 0,
        }),
      });

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

    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: tab.url,
        },
      })
      .callArgWith(1, {
        matched: true,
        data: testUtil.makeFoundItem({
          status: 0,
        }),
      });

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);

    $('#pattern_status').trigger('click');

    assert.ok(chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:update:status',
        data: {
          url: 'https://example.com/',
          status: 1,
          tabId: 20002,
        },
      })
      .calledOnce);

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

    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: tab.url,
        },
      })
      .callArgWith(1, {
        matched: true,
        data: testUtil.makeFoundItem({
          status: 1,
        }),
      });

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

    chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:find',
        data: {
          url: tab.url,
        },
      })
      .callArgWith(1, {
        matched: true,
        data: testUtil.makeFoundItem({
          status: 1,
        }),
      });

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), true);

    $('#pattern_status').trigger('click');

    assert.ok(chrome.runtime.sendMessage
      .withArgs({
        command: 'browser_action:update:status',
        data: {
          url: 'https://example.com/',
          status: 0,
          tabId: 30002,
        },
      })
      .calledOnce);

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);
  });
});
