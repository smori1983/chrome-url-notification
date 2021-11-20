const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Data = require('../../src/js/url-notification/data');

describe('urlNotification.data', () => {
  /**
   * @type {Data}
   */
  let SUT;

  beforeEach(() => {
    testUtil.clearStorage();
    SUT = new Data();
  });

  describe('updatePattern()', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3'}),
        testUtil.makePatternItem({url: 'https://example.com/item/*', msg: 'item'}),
      ]);
    });

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

  describe('sort by URL', () => {
    it('no data', () => {
      const patterns = [];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('comparison of integer', () => {
      const patterns = [
        { url: 'https://example.com/2', msg: '2' },
        { url: 'https://example.com/1', msg: '1' },
        { url: 'https://example.com/3', msg: '3' },
      ];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '1');
      assert.strictEqual(sorted[1].msg, '2');
      assert.strictEqual(sorted[2].msg, '3');
    });

    it('comparison of integer and "*"', () => {
      const patterns = [
        { url: 'https://example.com/2', msg: '2' },
        { url: 'https://example.com/1', msg: '1' },
        { url: 'https://example.com/*', msg: '*' },
      ];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '*');
      assert.strictEqual(sorted[1].msg, '1');
      assert.strictEqual(sorted[2].msg, '2');
    });
  });

  describe('sort by message', () => {
    it('no data', () => {
      const patterns = [];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('alphabet', () => {
      const patterns = [
        { url: 'https://example.com/2', msg: 'two' },
        { url: 'https://example.com/3', msg: 'one' },
        { url: 'https://example.com/1', msg: 'three' },
      ];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, 'one');
      assert.strictEqual(sorted[1].msg, 'three');
      assert.strictEqual(sorted[2].msg, 'two');
    });

    it('url is compared when message is same', () => {
      const patterns = [
        { url: 'https://example.com/3', msg: 'message' },
        { url: 'https://example.com/1', msg: 'message' },
        { url: 'https://example.com/2', msg: 'message' },
      ];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].url, 'https://example.com/1');
      assert.strictEqual(sorted[1].url, 'https://example.com/2');
      assert.strictEqual(sorted[2].url, 'https://example.com/3');
    });
  });
});
