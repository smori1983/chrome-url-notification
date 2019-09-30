const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const JSDOM = require('jsdom').JSDOM;
const SUT = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.header', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    delete require.cache[require.resolve('jquery')];
  });

  after(function () {
    delete global.chrome;
  });

  it('version', function () {
    const dom = new JSDOM(testUtil.getHtml('src/html/options.html'));

    global.window = dom.window;
    global.document = dom.window.document;

    const $ = require('jquery');

    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });

    SUT.show();

    assert.strictEqual($('#js_version').text(), 'Ver. 1.2.3');
  });
});
