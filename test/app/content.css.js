const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const _ = require('lodash');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Content = testUtil.Content;

describe('app.content.css', () => {
  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Content}
   */
  let content;

  beforeEach(() => {
    const dom = testUtil.dom.initContentScript('test_resource/html/content.03.html', {
      url: 'https://example.com/',
    });

    chrome = new ChromeMock(dom.window.chrome);
    content = new Content(dom.window.jQuery);
  });

  describe('forBody', () => {
    given([
      {displayPosition: 'top',          status: 1, expected: {top: '50px', bottom: '0px'}},
      {displayPosition: 'top',          status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'bottom',       status: 1, expected: {top: '0px',  bottom: '50px'}},
      {displayPosition: 'bottom',       status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'top_left',     status: 1, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'top_left',     status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'top_right',    status: 1, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'top_right',    status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'bottom_left',  status: 1, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'bottom_left',  status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'bottom_right', status: 1, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'bottom_right', status: 0, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'unknown',      status: 1, expected: {top: '0px',  bottom: '0px'}},
      {displayPosition: 'unknown',      status: 0, expected: {top: '0px',  bottom: '0px'}},
    ]).it('display position and status', (arg) => {
      chrome.contentFindMessage()
        .req({
          url: 'https://example.com/',
        })
        .res({
          item: testUtil.makeFoundItem({
            status: arg.status,
            displayPosition: arg.displayPosition,
          }),
        });

      const page = content.page();

      assert.deepStrictEqual(page.marginTop(), arg.expected.top);
      assert.deepStrictEqual(page.marginBottom(), arg.expected.bottom);
    });
  });

  describe('forMessage', () => {
    given([
      {status: 0, shown: false},
      {status: 1, shown: true},
    ]).it('initial state', (arg) => {
      chrome.contentFindMessage()
        .req({
          url: 'https://example.com/',
        })
        .res({
          item: testUtil.makeFoundItem({
            status: arg.status,
            displayPosition: arg.displayPosition,
          }),
        });

      const message = content.message();

      assert.deepStrictEqual(arg.shown, message.shown());
    });

    given([
      {displayPosition: 'top',          expected: {width: '100%', top: '0px', left: '0px'}},
      {displayPosition: 'bottom',       expected: {width: '100%', bottom: '0px', left: '0px'}},
      {displayPosition: 'top_left',     expected: {width: '50px', top: '10px', left: '10px'}},
      {displayPosition: 'top_right',    expected: {width: '50px', top: '10px', right: '10px'}},
      {displayPosition: 'bottom_left',  expected: {width: '50px', bottom: '10px', left: '10px'}},
      {displayPosition: 'bottom_right', expected: {width: '50px', bottom: '10px', right: '10px'}},
    ]).it('display position', (arg) => {
      chrome.contentFindMessage()
        .req({
          url: 'https://example.com/',
        })
        .res({
          item: testUtil.makeFoundItem({
            status: 1,
            displayPosition: arg.displayPosition,
          }),
        });

      const message = content.message();

      assert.deepStrictEqual(true, message.shown());

      assert.deepStrictEqual(arg.expected.width, message.css('width'));

      _.keys(arg.expected).forEach((property) => {
        assert.deepStrictEqual(arg.expected[property], message.css(property));
      });
    });
  });

  describe('forMessageMouseOver', () => {
    given([
      {displayPosition: 'top',          expected: {width: '100%'}},
      {displayPosition: 'bottom',       expected: {width: '100%'}},
      {displayPosition: 'top_left',     expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'top_right',    expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'bottom_left',  expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'bottom_right', expected: {width: 'calc(100% - 20px)'}},
    ]).it('display position', (arg) => {
      chrome.contentFindMessage()
        .req({
          url: 'https://example.com/',
        })
        .res({
          item: testUtil.makeFoundItem({
            status: 1,
            displayPosition: arg.displayPosition,
          }),
        });

      const message = content.message();

      message.mouseover();

      const width = 'width: ' + arg.expected.width;

      assert.ok(message.styleContains(width));
    });
  });

  describe('forMessageMouseOut', () => {
    given([
      {displayPosition: 'top',          expected: {width: '100%'}},
      {displayPosition: 'bottom',       expected: {width: '100%'}},
      {displayPosition: 'top_left',     expected: {width: '50px'}},
      {displayPosition: 'top_right',    expected: {width: '50px'}},
      {displayPosition: 'bottom_left',  expected: {width: '50px'}},
      {displayPosition: 'bottom_right', expected: {width: '50px'}},
    ]).it('display position', (arg) => {
      chrome.contentFindMessage()
        .req({
          url: 'https://example.com/',
        })
        .res({
          item: testUtil.makeFoundItem({
            status: 1,
            displayPosition: arg.displayPosition,
          }),
        });

      const message = content.message();

      message.mouseover();
      message.mouseout();

      const width = 'width: ' + arg.expected.width;

      assert.ok(message.styleContains(width));
    });
  });
});
