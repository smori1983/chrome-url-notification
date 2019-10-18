const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.block.matched');
const testUtil = require('../../test_lib/util');

/**
 * @param {string} url used to part of chrome.tabs.Tab
 */
const popupTabsQuery = function (url) {
  chrome.tabs.query
    .withArgs({
      currentWindow: true,
      active: true,
    })
    .callArgWith(1, [{
      url: url,
    }]);
};

/**
 * NOTE: This function is copied from message.popup.find.js
 *
 * @param {chrome.tabs.Tab} tab
 * @param {(FoundItem|null)} item
 */
const popupFindMessage = function(tab, item) {
  chrome.runtime.sendMessage
    .withArgs({
      command: 'browser_action:find',
      data: {
        url: tab.url,
      },
    })
    .callArgWith(1, {
      matched: item !== null,
      data: item,
    });
};

describe('popup.block.matched', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/popup.html'));
    SUT.show();
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('i18n', function () {
    it('status label', function () {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page span').eq(0);

      assert.strictEqual($element.text(), 'Status');
    });

    it('enabled label', function () {
      const $ = require('jquery');
      const $element = $('#block_for_matched_page label').eq(0);

      assert.strictEqual($element.text(), 'Enabled');
    });
  });

  describe('initial state of status checkbox', function () {
    it('pattern matched and status is 0', function () {
      popupTabsQuery('https://foo.example.com/page');
      popupFindMessage(testUtil.chrome.createTab({
        id: 10001,
        url: 'https://foo.example.com/page',
      }), testUtil.makeFoundItem({
        url: 'foo.example.com',
        status: 0,
      }));

      const $ = require('jquery');
      const $element = $('#pattern_status');

      assert.strictEqual($element.prop('checked'), false);
    });

    it('pattern matched and status is 1', function () {
      popupTabsQuery('https://foo.example.com/page');
      popupFindMessage(testUtil.chrome.createTab({
        id: 10002,
        url: 'https://foo.example.com/page',
      }), testUtil.makeFoundItem({
        url: 'foo.example.com',
        status: 1,
      }));

      const $ = require('jquery');
      const $element = $('#pattern_status');

      assert.strictEqual($element.prop('checked'), true);
    });
  });
});
