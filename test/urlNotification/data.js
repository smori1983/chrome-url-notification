const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/data');

describe('urlNotification.data', () => {
  beforeEach(() => {
    testUtil.clearStorage();
  });

  describe('URLソート', () => {
    it('データなし', () => {
      const patterns = [];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('整数の比較', () => {
      const patterns = [
        { url: 'http://example.com/2', msg: '2' },
        { url: 'http://example.com/1', msg: '1' },
        { url: 'http://example.com/3', msg: '3' },
      ];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '1');
      assert.strictEqual(sorted[1].msg, '2');
      assert.strictEqual(sorted[2].msg, '3');
    });

    it('整数と "*" の比較 : "*" が先に並ぶ', () => {
      const patterns = [
        { url: 'http://example.com/2', msg: '2' },
        { url: 'http://example.com/1', msg: '1' },
        { url: 'http://example.com/*', msg: '*' },
      ];

      const sorted = SUT.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '*');
      assert.strictEqual(sorted[1].msg, '1');
      assert.strictEqual(sorted[2].msg, '2');
    });
  });

  describe('メッセージソート', () => {
    it('データなし', () => {
      const patterns = [];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('アルファベット', () => {
      const patterns = [
        { url: 'http://example.com/2', msg: 'two' },
        { url: 'http://example.com/3', msg: 'one' },
        { url: 'http://example.com/1', msg: 'three' },
      ];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, 'one');
      assert.strictEqual(sorted[1].msg, 'three');
      assert.strictEqual(sorted[2].msg, 'two');
    });

    it('メッセージが同一の場合はURLが比較される', () => {
      const patterns = [
        { url: 'http://example.com/3', msg: 'message' },
        { url: 'http://example.com/1', msg: 'message' },
        { url: 'http://example.com/2', msg: 'message' },
      ];

      const sorted = SUT.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].url, 'http://example.com/1');
      assert.strictEqual(sorted[1].url, 'http://example.com/2');
      assert.strictEqual(sorted[2].url, 'http://example.com/3');
    });
  });
});
