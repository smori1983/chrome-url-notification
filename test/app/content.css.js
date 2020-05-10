const { describe, before, beforeEach, after } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const _ = require('lodash');
const SUT = require('../../src/js/app/content.css');
const testUtil = require('../../test_lib/util');

const css = SUT.init({
  body: {
    marginTop: '0px',
    marginBottom: '0px',
  },
});

describe('app.css', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  after(testUtil.uiBase.after);

  describe('forBody', function() {
    given([
      {displayPosition: 'top',          status: 1, expected: {marginTop: '50px'}},
      {displayPosition: 'top',          status: 0, expected: {marginTop: '0px'}},
      {displayPosition: 'bottom',       status: 1, expected: {marginBottom: '50px'}},
      {displayPosition: 'bottom',       status: 0, expected: {marginBottom: '0px'}},
      {displayPosition: 'top_left',     status: 1, expected: {}},
      {displayPosition: 'top_left',     status: 0, expected: {}},
      {displayPosition: 'top_right',    status: 1, expected: {}},
      {displayPosition: 'top_right',    status: 0, expected: {}},
      {displayPosition: 'bottom_left',  status: 1, expected: {}},
      {displayPosition: 'bottom_left',  status: 0, expected: {}},
      {displayPosition: 'bottom_right', status: 1, expected: {}},
      {displayPosition: 'bottom_right', status: 0, expected: {}},
      {displayPosition: 'unknown',      status: 1, expected: {}},
      {displayPosition: 'unknown',      status: 0, expected: {}},
    ]).it('display position and status', function(arg) {
      const result = css.forBody(arg.displayPosition, arg.status);

      assert.deepStrictEqual(result, arg.expected);
    });
  });

  describe('forMessage', function() {
    given([
      {status: 0},
      {status: 1},
    ]).it('element is always hidden initially regardless of status', function (arg) {
      const result = css.forMessage(testUtil.makeFoundItem({
        status: arg.status,
      }));

      assert.strictEqual(result.display, 'none');
    });

    given([
      {displayPosition: 'top',          expected: {width: '100%', top: '0px', left: '0px'}},
      {displayPosition: 'bottom',       expected: {width: '100%', bottom: '0px', left: '0px'}},
      {displayPosition: 'top_left',     expected: {width: '50px', top: '10px', left: '10px'}},
      {displayPosition: 'top_right',    expected: {width: '50px', top: '10px', right: '10px'}},
      {displayPosition: 'bottom_left',  expected: {width: '50px', bottom: '10px', left: '10px'}},
      {displayPosition: 'bottom_right', expected: {width: '50px', bottom: '10px', right: '10px'}},
    ]).it('display position', function (arg) {
      const result = css.forMessage(testUtil.makeFoundItem({
        displayPosition: arg.displayPosition,
      }));
      const targetProperties = _.pick(result, _.keys(arg.expected));

      assert.deepStrictEqual(targetProperties, arg.expected);
    });
  });

  describe('forMessageMouseOver', function () {
    given([
      {displayPosition: 'top',          expected: {}},
      {displayPosition: 'bottom',       expected: {}},
      {displayPosition: 'top_left',     expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'top_right',    expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'bottom_left',  expected: {width: 'calc(100% - 20px)'}},
      {displayPosition: 'bottom_right', expected: {width: 'calc(100% - 20px)'}},
    ]).it('display position', function (arg) {
      const result = css.forMessageMouseOver(testUtil.makeFoundItem({
        displayPosition: arg.displayPosition,
      }));

      assert.deepStrictEqual(result, arg.expected);
    });
  });

  describe('forMessageMouseOut', function () {
    given([
      {displayPosition: 'top',          expected: {}},
      {displayPosition: 'bottom',       expected: {}},
      {displayPosition: 'top_left',     expected: {width: '50px'}},
      {displayPosition: 'top_right',    expected: {width: '50px'}},
      {displayPosition: 'bottom_left',  expected: {width: '50px'}},
      {displayPosition: 'bottom_right', expected: {width: '50px'}},
    ]).it('display position', function (arg) {
      const result = css.forMessageMouseOut(testUtil.makeFoundItem({
        displayPosition: arg.displayPosition,
      }));

      assert.deepStrictEqual(result, arg.expected);
    });
  });
});
