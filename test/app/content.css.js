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

      assert.deepStrictEqual(result, {marginTop: '50px'});
    });

    it('display position is top and status is 0', function() {
      const result = css.forBody('top', 0);

      assert.deepStrictEqual(result, {marginTop: '0px'});
    });

    it('display position is bottom and status is 1', function() {
      const result = css.forBody('bottom', 1);

      assert.deepStrictEqual(result, {marginBottom: '50px'});
    });

    it('display position is bottom and status is 0', function() {
      const result = css.forBody('bottom', 0);

      assert.deepStrictEqual(result, {marginBottom: '0px'});
    });

    it('display position is top_left and status is 1', function() {
      const result = css.forBody('top_left', 1);

      assert.deepStrictEqual(result, {});
    });

    it('display position is top_left and status is 0', function() {
      const result = css.forBody('top_left', 0);

      assert.deepStrictEqual(result, {});
    });

    it('display position is top_right and status is 1', function() {
      const result = css.forBody('top_right', 1);

      assert.deepStrictEqual(result, {});
    });

    it('display position is top_right and status is 0', function() {
      const result = css.forBody('top_right', 0);

      assert.deepStrictEqual(result, {});
    });


    it('display position is bottom_left and status is 1', function() {
      const result = css.forBody('bottom_left', 1);

      assert.deepStrictEqual(result, {});
    });

    it('display position is bottom_left and status is 0', function() {
      const result = css.forBody('bottom_left', 0);

      assert.deepStrictEqual(result, {});
    });

    it('display position is bottom_right and status is 1', function() {
      const result = css.forBody('bottom_right', 1);

      assert.deepStrictEqual(result, {});
    });

    it('display position is bottom_right and status is 0', function() {
      const result = css.forBody('bottom_right', 0);

      assert.deepStrictEqual(result, {});
    });

    it('display position is invalid', function() {
      const result = css.forBody('unknown', 1);

      assert.deepStrictEqual(result, {});
    });
  });

  describe('forMessage', function() {
    describe('element is always hidden initially regardless of status', function( ) {
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

    describe('display position', function () {
      it('top', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'top',
        }));

        assert.strictEqual(result.width, '100%');
        assert.strictEqual(result.top, '0px');
        assert.strictEqual(result.left, '0px');
      });

      it('bottom', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'bottom',
        }));

        assert.strictEqual(result.width, '100%');
        assert.strictEqual(result.bottom, '0px');
        assert.strictEqual(result.left, '0px');
      });

      it('top_left', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'top_left',
        }));

        assert.strictEqual(result.width, '50px');
        assert.strictEqual(result.top, '10px');
        assert.strictEqual(result.left, '10px');
      });

      it('top_right', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'top_right',
        }));

        assert.strictEqual(result.width, '50px');
        assert.strictEqual(result.top, '10px');
        assert.strictEqual(result.right, '10px');
      });

      it('bottom_left', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'bottom_left',
        }));

        assert.strictEqual(result.width, '50px');
        assert.strictEqual(result.bottom, '10px');
        assert.strictEqual(result.left, '10px');
      });

      it('bottom_right', function () {
        const result = css.forMessage(testUtil.makeFoundItem({
          displayPosition: 'bottom_right',
        }));

        assert.strictEqual(result.width, '50px');
        assert.strictEqual(result.bottom, '10px');
        assert.strictEqual(result.right, '10px');
      });
    });
  });

  describe('forMouseOver', function () {
    it('display position is top', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'top',
      }));

      assert.deepStrictEqual(result, {});
    });

    it('display position is bottom', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'bottom',
      }));

      assert.deepStrictEqual(result, {});
    });

    it('display position is top_left', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'top_left',
      }));

      assert.deepStrictEqual(result, {width: 'calc(100% - 20px)'});
    });

    it('display position is top_right', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'top_right',
      }));

      assert.deepStrictEqual(result, {width: 'calc(100% - 20px)'});
    });

    it('display position is bottom_left', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'bottom_left',
      }));

      assert.deepStrictEqual(result, {width: 'calc(100% - 20px)'});
    });

    it('display position is bottom_right', function () {
      const result = css.forMouseOver(testUtil.makeFoundItem({
        displayPosition: 'bottom_right',
      }));

      assert.deepStrictEqual(result, {width: 'calc(100% - 20px)'});
    });
  });

  describe('forMouseOut', function () {
    it('display position is top', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'top',
      }));

      assert.deepStrictEqual(result, {});
    });

    it('display position is bottom', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'bottom',
      }));

      assert.deepStrictEqual(result, {});
    });

    it('display position is top_left', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'top_left',
      }));

      assert.deepStrictEqual(result, {width: '50px'});
    });

    it('display position is top_right', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'top_right',
      }));

      assert.deepStrictEqual(result, {width: '50px'});
    });

    it('display position is bottom_left', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'bottom_left',
      }));

      assert.deepStrictEqual(result, {width: '50px'});
    });

    it('display position is bottom_right', function () {
      const result = css.forMouseOut(testUtil.makeFoundItem({
        displayPosition: 'bottom_right',
      }));

      assert.deepStrictEqual(result, {width: '50px'});
    });
  });
});

