const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/content.tab');

const html = `
<html>
<body>
  <div id="chrome-url-notification-container-9b7414d403c1287ca963"></div>
</body>
</html>
`;

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
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    SUT.listen();

    chrome.runtime.onMessage
      .dispatch({
        command: 'tab:notify:status',
        data: {
          item: {
            url: 'https://example.com/',
            msg: 'message',
            backgroundColor: '000000',
            displayPosition: 'top',
            status: 0,
          },
          status: 0,
        },
      });

    // NOTE: default margin-top of <body> is 8px
    assert.strictEqual($('body').css('margin-top'), '8px');
    assert.strictEqual($('div').css('display'), 'none');
  });

  it('pattern matched and status is 1', function () {
    const dom = new JSDOM(html);

    global.window = dom.window;
    global.document = dom.window;

    const $ = require('jquery');

    SUT.listen();

    chrome.runtime.onMessage
      .dispatch({
        command: 'tab:notify:status',
        data: {
          item: {
            url: 'https://example.com/',
            msg: 'message',
            backgroundColor: '000000',
            displayPosition: 'bottom',
            status: 1,
          },
          status: 1,
        },
      });

    assert.strictEqual($('body').css('margin-bottom'), '50px');
    assert.strictEqual($('div').css('display'), 'block');
  });
});
