const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/options.header');
const testUtil = require('../../test_lib/util');

describe('options.header', function () {
  before(testUtil.options.before);
  beforeEach(testUtil.options.beforeEach);
  afterEach(testUtil.options.afterEach);
  after(testUtil.options.after);

  it('version', function () {
    testUtil.options.initDom(testUtil.getHtml('src/html/options.html'));

    const $ = require('jquery');

    chrome.runtime.getManifest
      .returns({
        version: '1.2.3',
      });

    SUT.show();

    assert.strictEqual($('#js_version').text(), 'Ver. 1.2.3');
  });
});
