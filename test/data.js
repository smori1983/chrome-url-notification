const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

describe('urlNotification.data', function() {
  beforeEach(function() {
    testUtil.clearStorage();
  });

  describe('URLソート', function() {
    it('データなし', function () {
      const patterns = [];

      const sorted = urlNotification.data.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('整数の比較', function () {
      const patterns = [
        { url: 'http://example.com/2', msg: '2' },
        { url: 'http://example.com/1', msg: '1' },
        { url: 'http://example.com/3', msg: '3' },
      ];

      const sorted = urlNotification.data.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '1');
      assert.strictEqual(sorted[1].msg, '2');
      assert.strictEqual(sorted[2].msg, '3');
    });

    it('整数と "*" の比較 : "*" が先に並ぶ', function () {
      const patterns = [
        { url: 'http://example.com/2', msg: '2' },
        { url: 'http://example.com/1', msg: '1' },
        { url: 'http://example.com/*', msg: '*' },
      ];

      const sorted = urlNotification.data.sortByUrl(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, '*');
      assert.strictEqual(sorted[1].msg, '1');
      assert.strictEqual(sorted[2].msg, '2');
    });
  });

  describe('メッセージソート', function() {
    it('データなし', function() {
      const patterns = [];

      const sorted = urlNotification.data.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 0);
    });

    it('アルファベット', function() {
      const patterns = [
        { url: 'http://example.com/2', msg: 'two' },
        { url: 'http://example.com/3', msg: 'one' },
        { url: 'http://example.com/1', msg: 'three' },
      ];

      const sorted = urlNotification.data.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].msg, 'one');
      assert.strictEqual(sorted[1].msg, 'three');
      assert.strictEqual(sorted[2].msg, 'two');
    });

    it('メッセージが同一の場合はURLが比較される', function() {
      const patterns = [
        { url: 'http://example.com/3', msg: 'message' },
        { url: 'http://example.com/1', msg: 'message' },
        { url: 'http://example.com/2', msg: 'message' },
      ];

      const sorted = urlNotification.data.sortByMessage(patterns);

      assert.strictEqual(sorted.length, 3);
      assert.strictEqual(sorted[0].url, 'http://example.com/1');
      assert.strictEqual(sorted[1].url, 'http://example.com/2');
      assert.strictEqual(sorted[2].url, 'http://example.com/3');
    });
  });
});
