const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Storage = require('../../src/js/notification/storage');

describe('urlNotification.storage.pattern-collection', () => {
  /**
   * @type {Storage}
   */
  let SUT;

  beforeEach(() => {
    SUT = new Storage();
  });

  describe('sortByUrl', () => {
    it('no data', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), []);

      const sorted = SUT.getCollection().sortByUrl().get();

      assert.strictEqual(sorted.length, 0);
    });

    it('comparison of integer', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3'}),
      ]);

      const sorted = SUT.getCollection().sortByUrl().get();

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '1');
      assert.strictEqual(sorted[1].msg, '2');
      assert.strictEqual(sorted[2].msg, '3');
    });

    it('comparison of integer and "*"', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
        testUtil.makePatternItem({url: 'https://example.com/*', msg: '*'}),
      ]);

      const sorted = SUT.getCollection().sortByUrl().get();

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '*');
      assert.strictEqual(sorted[1].msg, '1');
      assert.strictEqual(sorted[2].msg, '2');
    });
  });

  describe('sortByMessage', () => {
    it('no data', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), []);

      const sorted = SUT.getCollection().sortByMessage().get();

      assert.strictEqual(sorted.length, 0);
    });

    it('alphabet', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: 'three'}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: 'two'}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: 'one'}),
      ]);

      const sorted = SUT.getCollection().sortByMessage().get();

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, 'one');
      assert.strictEqual(sorted[1].msg, 'three');
      assert.strictEqual(sorted[2].msg, 'two');
    });

    it('url is compared when message is same', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/3', msg: 'message'}),
        testUtil.makePatternItem({url: 'https://example.com/1', msg: 'message'}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: 'message'}),
      ]);

      const sorted = SUT.getCollection().sortByMessage().get();

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].url, 'https://example.com/1');
      assert.strictEqual(sorted[1].url, 'https://example.com/2');
      assert.strictEqual(sorted[2].url, 'https://example.com/3');
    });
  });
});
