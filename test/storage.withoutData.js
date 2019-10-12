const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

describe('urlNotification.storage.withoutData', function() {
  beforeEach(function () {
    testUtil.clearStorage();

    SUT.background.migrate();
  });

  describe('削除', function () {
    it('全件削除', function () {
      SUT.storage.deleteAll();

      assert.strictEqual(SUT.storage.getCount(), 0);
    });

    it('1件削除 - 該当データ無し', function () {
      SUT.storage.deletePattern('http://example.com/');

      assert.strictEqual(SUT.storage.getCount(), 0);
    });
  });

  describe('参照', function () {
    it('全件取得', function () {
      const all = SUT.storage.getAll();

      assert.strictEqual(all.length, 0);
    });

    it('URLで検索 該当データなし', function () {
      assert.strictEqual(SUT.storage.findByUrl('http://example.com/'), null);
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

      SUT.storage.updatePattern('http://example.com/', item);

      assert.strictEqual(SUT.storage.findByUrl('http://example.com/'), null);
    });

    it('パターンの重複登録はできない', function () {
      const item = {
        url: 'http://example.com/1',
        msg: '1',
        backgroundColor: '000000',
        displayPosition: 'top',
      };

      SUT.storage.addPattern(item);
      SUT.storage.addPattern(item);
      SUT.storage.addPattern(item);

      assert.strictEqual(SUT.storage.getCount(), 1);
    });
  });
});
