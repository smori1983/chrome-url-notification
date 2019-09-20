const fs = require('fs');
const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const afterEach = require('mocha').afterEach;
const it = require('mocha').it;
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/popup.find');

const html = fs.readFileSync(__dirname + '/../../src/html/popup.html');

describe('message.popup.find', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
    delete require.cache[require.resolve('jquery')];
  });

  afterEach(function () {

  });

  after(function () {
    delete (global.chrome);
  });

  it('pattern not matched', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    const tab = {
      id: 10001,
      url: 'https://www.example.com/',
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

  it('pattern matched status is 0', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    const tab = {
      id: 10002,
      url: 'https://www.example.com/',
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
        data: {
          url: 'https://example.cm/',
          message: 'message',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 0,
        },
      });

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), false);
  });

  it('pattern matched status is 1', function() {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    const tab = {
      id: 10002,
      url: 'https://www.example.com/',
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
        data: {
          url: 'https://example.cm/',
          message: 'message',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 1,
        },
      });

    assert.strictEqual($('#block_for_matched_page').css('display'), 'block');
    assert.strictEqual($('#pattern_status').prop('checked'), true);
  });
});
