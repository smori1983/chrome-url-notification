const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

const currentVersion = 3;

describe('urlNotification.finder', function() {
  describe('ステータスが全て1', function() {
    beforeEach(function () {
      localStorage.clear();
      localStorage.setItem('version', currentVersion.toString());
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/*', msg: '*', backgroundColor: '111111', displayPosition: 'top', status: 1 },

        { url: 'http://abc-123.net/1', msg: 'abc-123-1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://abc-123.net/*', msg: 'abc-123-0', backgroundColor: '111111', displayPosition: 'top', status: 1 },

        { url: 'http://*.example.com/', msg: 'subdomain-1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
      ]));
    });

    it('URLで検索 該当データなし', function () {
      const result = urlNotification.finder.findFor('http://example.com/');

      assert.strictEqual(result, null);
    });

    it('URLで検索 *パターンにマッチ', function () {
      const result = urlNotification.finder.findFor('http://example.com/3');

      const expected = {
        url: 'http://example.com/*',
        message: '*',
        backgroundColor: '111111',
        displayPosition: 'top',
        fontColor: 'ffffff',
      };

      assert.deepStrictEqual(result, expected);
    });

    it('URLで検索 部分一致', function () {
      const result = urlNotification.finder.findFor('http://example.com/1/1.html');

      const expected = {
        url: 'http://example.com/1',
        message: '1',
        backgroundColor: '111111',
        displayPosition: 'top',
        fontColor: 'ffffff',
      };

      assert.deepStrictEqual(result, expected);
    });

    it('URLで検索 エスケープ処理 : -', function () {
      const result = urlNotification.finder.findFor('http://abc-123.net/1.html');

      assert.strictEqual(result.message, 'abc-123-1');
    });

    it('URLで検索 *パターンエスケープ処理 : -', function () {
      const result = urlNotification.finder.findFor('http://a-b-c.example.com/');

      assert.strictEqual(result.message, 'subdomain-1');
    });
  });

  describe('ステータスを考慮', function() {
    beforeEach(function () {
      localStorage.clear();
      localStorage.setItem('version', currentVersion.toString());
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1 },
      ]));
    });

    it('ステータスが 1 のパターン', function () {
      const result = urlNotification.finder.findFor('http://example.com/3');

      assert.strictEqual(result.message, '3');
    });

    it('ステータスが 0 のパターン', function () {
      const result = urlNotification.finder.findFor('http://example.com/2');

      assert.strictEqual(result, null);
    });
  });
});
