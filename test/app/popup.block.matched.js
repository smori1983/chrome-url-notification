const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const chrome = require('sinon-chrome');
const SUT = require('../../src/js/app/popup.block.matched');
const testUtil = require('../../test_lib/util');

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
      chrome.tabs.query
        .withArgs({
          currentWindow: true,
          active: true,
        })
        .callArgWith(1, [{
          url: 'https://foo.example.com/page',
        }]);

      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:find',
          data: {
            url: 'https://foo.example.com/page',
          },
        })
        .callArgWith(1, {
          matched: true,
          data: {
            url: 'foo.example.com',
            status: 0,
          },
        });

      const $ = require('jquery');
      const $element = $('#pattern_status');

      assert.strictEqual($element.prop('checked'), false);
    });

    it('pattern matched and status is 1', function () {
      chrome.tabs.query
        .withArgs({
          currentWindow: true,
          active: true,
        })
        .callArgWith(1, [{
          url: 'https://foo.example.com/page',
        }]);

      chrome.runtime.sendMessage
        .withArgs({
          command: 'browser_action:find',
          data: {
            url: 'https://foo.example.com/page',
          },
        })
        .callArgWith(1, {
          matched: true,
          data: {
            url: 'foo.example.com',
            status: 1,
          },
        });

      const $ = require('jquery');
      const $element = $('#pattern_status');

      assert.strictEqual($element.prop('checked'), true);
    });
  });
});
