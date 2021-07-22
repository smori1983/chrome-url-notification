const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');

describe('urlNotification.background', () => {
  beforeEach(() => {
    testUtil.initStorage(testUtil.currentVersion().toString(), [
      testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
      testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
      testUtil.makePatternItem({url: 'https://example.com/3', msg: '3'}),
      testUtil.makePatternItem({url: 'https://example.com/item/*', msg: 'item'}),
    ]);
  });

  describe('find()', () => {
    it('no matching data', () => {
      const result = SUT.find('foo');

      assert.strictEqual(result.matched, false);
      assert.strictEqual(result.data, null);
    });

    it('no matching data - pattern', () => {
      const result = SUT.find('https://example.com/item/');

      assert.strictEqual(result.matched, false);
      assert.strictEqual(result.data, null);
    });

    it('has matching data', () => {
      const result = SUT.find('https://example.com/1');

      const expectedData = {
        url: 'https://example.com/1',
        message: '1',
        backgroundColor: '000000',
        fontColor: 'ffffff',
        displayPosition: 'bottom',
        status: 1,
      };

      assert.strictEqual(result.matched, true);
      assert.deepStrictEqual(result.data, expectedData);
    });

    it('has matching data - pattern', () => {
      const result = SUT.find('https://example.com/item/5');

      const expectedData = {
        url: 'https://example.com/item/*',
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

  describe('updatePattern()', () => {
    it('Call with non-existing pattern', () => {
      const result = SUT.updatePattern('https://example.com/999', {
        status: 0,
      });

      assert.strictEqual(result, false);
    });

    it('Normal case', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        status: 0,
      });

      assert.strictEqual(result, true);
    });

    it('Try to update with invalid value', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        status: 9,
      });

      assert.strictEqual(result, false);
    });

    it('Try to update with invalid key', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        foo: 'bar',
      });

      assert.strictEqual(result, false);
    });
  });
});
