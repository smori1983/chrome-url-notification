const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../test_lib/util');
const SUT = require('../src/js/urlNotification/finder');

describe('urlNotification.finder', function() {
  describe('ステータスが全て1', function() {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/*', msg: '*', backgroundColor: '111111', displayPosition: 'top', status: 1 },

        { url: 'http://abc-123.net/1', msg: 'abc-123-1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://abc-123.net/*', msg: 'abc-123-0', backgroundColor: '111111', displayPosition: 'top', status: 1 },

        { url: 'http://*.example.com/', msg: 'subdomain-1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
      ]);
    });

    it('URLで検索 該当データなし', function () {
      const result = SUT.findFor('http://example.com/');

      assert.strictEqual(result, null);
    });

    it('URLで検索 *パターンにマッチ', function () {
      const result = SUT.findFor('http://example.com/3');

      const expected = {
        url: 'http://example.com/*',
        message: '*',
        backgroundColor: '111111',
        displayPosition: 'top',
        fontColor: 'ffffff',
        status: 1,
      };

      assert.deepStrictEqual(result, expected);
    });

    it('URLで検索 部分一致', function () {
      const result = SUT.findFor('http://example.com/1/1.html');

      const expected = {
        url: 'http://example.com/1',
        message: '1',
        backgroundColor: '111111',
        displayPosition: 'top',
        fontColor: 'ffffff',
        status: 1,
      };

      assert.deepStrictEqual(result, expected);
    });

    it('URLで検索 エスケープ処理 : -', function () {
      const result = SUT.findFor('http://abc-123.net/1.html');

      assert.strictEqual(result.message, 'abc-123-1');
    });

    it('URLで検索 *パターンエスケープ処理 : -', function () {
      const result = SUT.findFor('http://a-b-c.example.com/');

      assert.strictEqual(result.message, 'subdomain-1');
    });
  });

  describe('ステータスを考慮', function() {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1 },
      ]);
    });

    it('ステータスが 1 のパターン', function () {
      const result = SUT.findFor('http://example.com/3');

      assert.strictEqual(result.message, '3');
    });

    it('ステータスが 0 のパターン', function () {
      const result = SUT.findFor('http://example.com/2');

      assert.strictEqual(result, null);
    });
  });

  describe('find option - ignoreStatus', function() {
    beforeEach(function () {
      testUtil.setUpStorage(testUtil.currentVersion().toString(), [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1 },
      ]);
    });

    it('ignoreStatus not set and pattern exists with status is 1', function () {
      const result = SUT.findFor('http://example.com/1');

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus not set and pattern exists with status is 0', function () {
      const result = SUT.findFor('http://example.com/2');

      assert.strictEqual(result, null);
    });

    it('ignoreStatus is true and pattern exists with status is 1', function () {
      const result = SUT.findFor('http://example.com/1', { ignoreStatus: true });

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus is true and pattern exists with status is 0', function () {
      const result = SUT.findFor('http://example.com/2', { ignoreStatus: true });

      assert.strictEqual(result.message, '2');
    });

    it('ignoreStatus is false and pattern exists with status is 1', function () {
      const result = SUT.findFor('http://example.com/1', { ignoreStatus: false });

      assert.strictEqual(result.message, '1');
    });

    it('ignoreStatus is false and pattern exists with status is 0', function () {
      const result = SUT.findFor('http://example.com/2', { ignoreStatus: false });

      assert.strictEqual(result, null);
    });
  });
});
