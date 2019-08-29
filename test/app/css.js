const describe = require('mocha').describe;
const before = require('mocha').before;
const beforeEach = require('mocha').beforeEach;
const after = require('mocha').after;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../../src/js/app/main');
const chrome = require('sinon-chrome');

const css = SUT.css.init({
  body: {
    marginTop: '0px',
    marginBottom: '0px',
  },
});

describe('app.css', function () {
  before(function () {
    global.chrome = chrome;
  });

  beforeEach(function () {
    chrome.flush();
  });

  after(function () {
    delete global.chrome;
  });

  describe('forBody', function() {
    it('display position is top and status is 1', function() {
      const result = css.forBody('top', 1);

      assert.strictEqual('50px', result.marginTop);
    });

    it('display position is top and status is 0', function() {
      const result = css.forBody('top', 0);

      assert.strictEqual('0px', result.marginTop);
    });

    it('display position is bottom and status is 1', function() {
      const result = css.forBody('bottom', 1);

      assert.strictEqual('50px', result.marginBottom);
    });

    it('display position is bottom and status is 0', function() {
      const result = css.forBody('bottom', 0);

      assert.strictEqual('0px', result.marginBottom);
    });

    it('display position is invalid', function() {
      const result = css.forBody('unknown', 1);

      assert.deepStrictEqual({}, result);
    });
  });

  describe('forMessage', function() {
    describe('status', function( ) {
      it('status is 1', function () {
        const result = css.forMessage({
          url: 'https://example.com/',
          message: 'example',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 1,
        });

        assert.strictEqual('undefined', typeof result.display);
      });

      it('status is 0', function () {
        const result = css.forMessage({
          url: 'https://example.com/',
          message: 'example',
          backgroundColor: '000000',
          fontColor: 'ffffff',
          displayPosition: 'top',
          status: 0,
        });

        assert.strictEqual('none', result.display);
      });
    });
  });
});

