const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
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
        const result = css.forMessage(testUtil.makeFoundItem({
          status: 1,
        }));

        assert.strictEqual('none', result.display);
      });

      it('status is 0', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          status: 0,
        }));

        assert.strictEqual('none', result.display);
      });
    });
  });
});

