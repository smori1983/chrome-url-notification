const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
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
    const $link = $('#link_options').find('a');

    assert.strictEqual($link.length, 1);
    assert.strictEqual($link.eq(0).text(), 'Options');
  });
});
