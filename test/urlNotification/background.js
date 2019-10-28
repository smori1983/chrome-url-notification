const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');

describe('urlNotification.background', function () {
  beforeEach(function () {
    testUtil.setUpStorage(testUtil.currentVersion(), [
      testUtil.makePatternItem({url: 'http://example.com/1', msg: '1'}),
      testUtil.makePatternItem({url: 'http://example.com/2', msg: '2'}),
      testUtil.makePatternItem({url: 'http://example.com/3', msg: '3'}),
      testUtil.makePatternItem({url: 'http://example.com/item/*', msg: 'item'}),
    ]);
  });

  describe('find()', function() {
    it('該当データなし', function () {
      const result = SUT.find('foo');

      assert.strictEqual(result.matched, false);
      assert.strictEqual(result.data, null);
    });

    it('該当データなし - パターン', function () {
      const result = SUT.find('http://example.com/item/');

      assert.strictEqual(result.matched, false);
      assert.strictEqual(result.data, null);
    });

    it('該当データあり', function () {
      const result = SUT.find('http://example.com/1');

      const expectedData = {
        url: 'http://example.com/1',
        message: '1',
        backgroundColor: '000000',
        fontColor: 'ffffff',
        displayPosition: 'bottom',
        status: 1,
      };

      assert.strictEqual(result.matched, true);
      assert.deepStrictEqual(result.data, expectedData);
    });

    it('該当データあり - パターンにマッチ', function () {
      const result = SUT.find('http://example.com/item/5');

      const expectedData = {
        url: 'http://example.com/item/*',
        message: 'item',
        backgroundColor: '000000',
        fontColor: 'ffffff',
        displayPosition: 'bottom',
        status: 1,
      };

      assert.strictEqual(result.matched, true);
      assert.deepStrictEqual(result.data, expectedData);
    });
  });

  describe('updatePattern()', function () {
    it('Call with non-existing pattern', function () {
      const result = SUT.updatePattern('http://example.com/999', {
        status: 0,
      });

      assert.strictEqual(result, false);
    });

    it('Normal case', function () {
      const result = SUT.updatePattern('http://example.com/1', {
        status: 0,
      });

      assert.strictEqual(result, true);
    });

    it('Try to update with invalid value', function () {
      const result = SUT.updatePattern('http://example.com/1', {
        status: 9,
      });

      assert.strictEqual(result, false);
    });

    it('Try to update with invalid key', function () {
      const result = SUT.updatePattern('http://example.com/1', {
        foo: 'bar',
      });

      assert.strictEqual(result, false);
    });
  });
});
