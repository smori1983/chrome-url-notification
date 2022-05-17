const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Finder = require('../../src/js/notification/finder');

describe('urlNotification.finder', () => {
  /**
   * @type {Finder}
   */
  let SUT;

  beforeEach(() => {
    SUT = new Finder();
  });

  describe('status is all 1', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
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

      assert.strictEqual(result.data, null);
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

      assert.deepStrictEqual(result.data, expected);
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

      assert.deepStrictEqual(result.data, expected);
    });

    it('find by url - escape of "-"', () => {
      const result = SUT.findFor('https://abc-123.net/1.html');

      assert.strictEqual(result.data.message, 'abc-123-1');
    });

    it('find by url - escape of "-" for "*" pattern', () => {
      const result = SUT.findFor('https://a-b-c.example.com/');

      assert.strictEqual(result.data.message, 'subdomain-1');
    });
  });

  describe('consider status', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1', status: 1}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2', status: 0}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3', status: 1}),
      ]);
    });

    it('pattern that status is 1', () => {
      const result = SUT.findFor('https://example.com/3');

      assert.strictEqual(result.data.message, '3');
    });

    it('pattern that status is 0', () => {
      const result = SUT.findFor('https://example.com/2');

      assert.strictEqual(result.data, null);
    });
  });

});
