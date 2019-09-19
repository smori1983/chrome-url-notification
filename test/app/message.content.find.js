const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const afterEach = require('mocha').afterEach;
const it = require('mocha').it;
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/content.find');

describe('message.content_scripts', function () {
  before(function() {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
    delete require.cache[require.resolve('jquery')];
  });

  afterEach(function () {

  });

  after(function() {
    delete(global.chrome);
  });

  it('pattern not matched', function() {
    const dom = new JSDOM('<html><body></body></html>', {
      url: 'https://example.com/',
    });

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    SUT.sendMessage();

    chrome.runtime.sendMessage
      .withArgs({
        command: 'content_scripts:find',
        data: {
          url: 'https://example.com/',
        },
      })
      .callArgWith(1, {
        matched: false,
        data: null,
      });

    assert.strictEqual($('div').length, 0);
  });

  it('pattern matched status is 0', function () {
    const dom = new JSDOM('<html><body></body></html>', {
      url: 'https://example.com/',
    });

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    SUT.sendMessage();

    chrome.runtime.sendMessage
      .withArgs({
        command: 'content_scripts:find',
        data: {
          url: 'https://example.com/',
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

    const $container = $('div');
    assert.strictEqual($container.length, 1);
    assert.strictEqual($container.css('display'), 'none');
  });

  it('pattern matched status is 1', function () {
    const dom = new JSDOM('<html><body></body></html>', {
      url: 'https://example.com/',
    });

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    SUT.sendMessage();

    chrome.runtime.sendMessage
      .withArgs({
        command: 'content_scripts:find',
        data: {
          url: 'https://example.com/',
        },
      })
      .callArgWith(1, {
        matched: true,
        data: {
          url: 'https://example.cm/',
          message: 'message',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'bottom',
          status: 1,
        },
      });

    const $container = $('div');
    assert.strictEqual($container.length, 1);
    assert.strictEqual($container.css('display'), 'block');
  });
});
