const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../test_lib/util');
const SUT = require('../src/js/urlNotification/storage');
const background = require('../src/js/urlNotification/background');

describe('urlNotification.storage.withData', function() {
  beforeEach(function () {
    testUtil.clearStorage();

    SUT.addPattern({url: 'http://example.com/1', msg: '1'});
    SUT.addPattern({url: 'http://example.com/2', msg: '2'});
    SUT.addPattern({url: 'http://example.com/3', msg: '3'});

    background.migrate();
  });

  describe('削除', function () {
    it('全件削除', function () {
      SUT.deleteAll();

      assert.strictEqual(SUT.getCount(), 0);
    });

    it('1件削除 - 該当データ有り', function () {
      SUT.deletePattern('http://example.com/1');

      assert.strictEqual(SUT.getCount(), 2);
    });

    it('1件削除 - 該当データ無し', function () {
      SUT.deletePattern('http://example.com/');

      assert.strictEqual(SUT.getCount(), 3);
    });
  });

  describe('参照', function () {
    it('全件取得', function () {
      const all = SUT.getAll();

      assert.strictEqual(all.length, 3);
      assert.strictEqual(all[0].msg, '1');
      assert.strictEqual(all[1].msg, '2');
      assert.strictEqual(all[2].msg, '3');
    });

    it('URLで検索 該当データなし', function () {
      assert.strictEqual(SUT.findByUrl('http://example.com/'), null);
    });

    it('URLで検索 該当データあり', function () {
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '2');
    });
  });

  describe('更新', function () {
    it('データ更新 - 該当データ無し', function () {
      SUT.updatePattern('http://example.com/', {
        url: 'http://example.com/',
        msg: '!',
      });

      assert.strictEqual(SUT.getCount(), 3);
      assert.strictEqual(SUT.findByUrl('http://example.com/1').msg, '1');
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '2');
      assert.strictEqual(SUT.findByUrl('http://example.com/3').msg, '3');
    });

    it('データ更新 - 該当データ有り', function () {
      SUT.updatePattern('http://example.com/2', {
        url: 'http://example.com/2',
        msg: '!',
      });

      assert.strictEqual(SUT.getCount(), 3);
      assert.strictEqual(SUT.findByUrl('http://example.com/1').msg, '1');
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '!');
      assert.strictEqual(SUT.findByUrl('http://example.com/3').msg, '3');
    });
  });
});
