const { describe, before, beforeEach, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.block.all');
const testUtil = require('../../test_lib/util');

describe('app.popup.block.all', () => {
  before(testUtil.uiBase.initI18n('en'));
  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    SUT.show();
  });

  it('link to options page should be shown', () => {
    const $ = require('jquery');
    const $link = $('#link_options a');

    assert.strictEqual($link.length, 1);
    assert.strictEqual($link.eq(0).text(), 'Options');
  });

  it('click link to options page', () => {
    const path = 'chrome-extension://xxx/html/options.html';

    chrome.runtime.getURL
      .withArgs('html/options.html')
      .returns(path);

    const $ = require('jquery');
    const $link = $('#link_options a').eq(0);

    $link.trigger('click');

    assert.ok(testUtil.chrome.tabsCreateCalledWith(path));
  });
});
