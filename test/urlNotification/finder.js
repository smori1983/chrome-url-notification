const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/finder');

describe('urlNotification.finder', () => {
  describe('status is all 1', () => {
    beforeEach(() => {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
        testUtil.makePatternItem({url: 'https://example.com/*', msg: '*'}),

        testUtil.makePatternItem({url: 'https://abc-123.net/1', msg: 'abc-123-1'}),
        testUtil.makePatternItem({url: 'https://abc-123.net/*', msg: 'abc-123-0'}),

        testUtil.makePatternItem({url: 'https://*.example.com/', msg: 'subdomain-1'}),
      ]);
    });

    it('find by url - no matching data', () => {
      const result = SUT.findFor('https://example.com/');

      assert.strictEqual(result, null);
    });

    it('find by url - matches with "*" pattern', () => {
      const result = SUT.findFor('https://example.com/3');

      const expected = {
        url: 'https://example.com/*',
        message: '*',
        backgroundColor: '000000',
        displayPosition: 'bottom',
        fontColor: 'ffffff',
        status: 1,
      };

      assert.deepStrictEqual(result, expected);
    });

    it('find by url - matches partially', () => {
      const result = SUT.findFor('https://example.com/1/1.html');

      const expected = {
        url: 'https://example.com/1',
        message: '1',
        backgroundColor: '000000',
        displayPosition: 'bottom',
        fontColor: 'ffffff',
        status: 1,
      };

      assert.deepStrictEqual(result, expected);
    });

    it('find by url - escape of "-"', () => {
      const result = SUT.findFor('https://abc-123.net/1.html');

      assert.strictEqual(result.message, 'abc-123-1');
    });

    it('find by url - escape of "-" for "*" pattern', () => {
      const result = SUT.findFor('https://a-b-c.example.com/');

      assert.strictEqual(result.message, 'subdomain-1');
    });
  });

  describe('consider status', () => {
    beforeEach(() => {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1', status: 1}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2', status: 0}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3', status: 1}),
      ]);
    });

    it('pattern that status is 1', () => {
      const result = SUT.findFor('https://example.com/3');

      assert.strictEqual(result.message, '3');
    });

    it('pattern that status is 0', () => {
      const result = SUT.findFor('https://example.com/2');

      assert.strictEqual(result, null);
    });
  });

  describe('find option - ignoreStatus', () => {
    beforeEach(() => {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1', status: 1 }),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2', status: 0 }),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3', status: 1 }),
      ]);
    });

    it('ignoreStatus not set and pattern exists with status is 1', () => {
      const result = SUT.findFor('https://example.com/1');

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus not set and pattern exists with status is 0', () => {
      const result = SUT.findFor('https://example.com/2');

      assert.strictEqual(result, null);
    });

    it('ignoreStatus is true and pattern exists with status is 1', () => {
      const result = SUT.findFor('https://example.com/1', { ignoreStatus: true });

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus is true and pattern exists with status is 0', () => {
      const result = SUT.findFor('https://example.com/2', { ignoreStatus: true });

      assert.strictEqual(result.message, '2');
    });

    it('ignoreStatus is false and pattern exists with status is 1', () => {
      const result = SUT.findFor('https://example.com/1', { ignoreStatus: false });

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus is false and pattern exists with status is 0', () => {
      const result = SUT.findFor('https://example.com/2', { ignoreStatus: false });

      assert.strictEqual(result, null);
    });
  });
});
