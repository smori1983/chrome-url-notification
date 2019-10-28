const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.block.all');
const testUtil = require('../../test_lib/util');

describe('popup.block.all', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    SUT.show();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('link to options page should be shown', function () {
    const $ = require('jquery');
    const $link = $('#link_options a');

    assert.strictEqual($link.length, 1);
    assert.strictEqual($link.eq(0).text(), 'Options');
  });

  it('click link to options page', function () {
    const path = 'chrome-extension://xxx/html/options.html';

    chrome.runtime.getURL
      .withArgs('html/options.html')
      .returns(path);

    const $ = require('jquery');
    const $link = $('#link_options a').eq(0);

    $link.trigger('click');

    assert.strictEqual(testUtil.chrome.tabsCreateShould(path), true);
  });
});
