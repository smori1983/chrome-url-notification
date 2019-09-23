const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/content.tab');
const testUtil = require('../../test_lib/util');

/**
 * @param {string} displayPosition
 * @param {number} status
 */
const tabNotifyDispatch = function(displayPosition, status) {
  chrome.runtime.onMessage
    .dispatch({
      command: 'tab:notify:status',
      data: {
        item: testUtil.makeFoundItem({
          displayPosition: displayPosition,
          status: status,
        }),
      },
    });
};

describe('message.content.tab', function () {
  before(function() {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
    delete require.cache[require.resolve('jquery')];
  });

  after(function() {
    delete(global.chrome);
  });

  it('pattern matched and status is 0', function () {
    const dom = new JSDOM(testUtil.getHtml('test_resource/html/content.02.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    const $ = require('jquery');

    SUT.listen();

    tabNotifyDispatch('top', 0);

    // NOTE: default margin-top of <body> is 8px
    assert.strictEqual($('body').css('margin-top'), '8px');
    assert.strictEqual($('div').css('display'), 'none');
  });

  it('pattern matched and status is 1', function () {
    const dom = new JSDOM(testUtil.getHtml('test_resource/html/content.02.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    const $ = require('jquery');

    SUT.listen();

    tabNotifyDispatch('bottom', 1);

    assert.strictEqual($('body').css('margin-bottom'), '50px');
    assert.strictEqual($('div').css('display'), 'block');
  });
});
