const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../test_lib/util');
const SUT = require('../src/js/urlNotification/storage');
const background = require('../src/js/urlNotification/background');

describe('urlNotification.storage.withoutData', function() {
  beforeEach(function () {
    testUtil.clearStorage();

    background.migrate();
  });

  describe('削除', function () {
    it('全件削除', function () {
      SUT.deleteAll();

      assert.strictEqual(SUT.getCount(), 0);
    });

    it('1件削除 - 該当データ無し', function () {
      SUT.deletePattern('http://example.com/');

      assert.strictEqual(SUT.getCount(), 0);
    });
  });

  describe('参照', function () {
    it('全件取得', function () {
      const all = SUT.getAll();

      assert.strictEqual(all.length, 0);
    });

    it('URLで検索 該当データなし', function () {
      assert.strictEqual(SUT.findByUrl('http://example.com/'), null);
    });
  });

  describe('更新', function () {
    it('データ更新 - 該当データ無し', function () {
      const item = {
        url: 'http://example.com/',
        msg: '!',
        backgroundColor: '000000',
        displayPosition: 'top',
      };

      SUT.updatePattern('http://example.com/', item);

      assert.strictEqual(SUT.findByUrl('http://example.com/'), null);
    });

    it('パターンの重複登録はできない', function () {
      const item = {
        url: 'http://example.com/1',
        msg: '1',
        backgroundColor: '000000',
        displayPosition: 'top',
      };

      SUT.addPattern(item);
      SUT.addPattern(item);
      SUT.addPattern(item);

      assert.strictEqual(SUT.getCount(), 1);
    });
  });
});
