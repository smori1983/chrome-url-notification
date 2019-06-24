const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.storage.withData', function() {
  beforeEach(function () {
    localStorage.clear();

    urlNotification.storage.addPattern({url: 'http://example.com/1', msg: '1'});
    urlNotification.storage.addPattern({url: 'http://example.com/2', msg: '2'});
    urlNotification.storage.addPattern({url: 'http://example.com/3', msg: '3'});
  });

  it('全データ削除', function () {
    urlNotification.storage.deleteAll();

    assert.strictEqual(urlNotification.storage.getCount(), 0);
  });

  it('1件削除 - 該当データ有り', function () {
    urlNotification.storage.deletePattern('http://example.com/1');

    assert.strictEqual(urlNotification.storage.getCount(), 2);
  });

  it('1件削除 - 該当データ無し', function () {
    urlNotification.storage.deletePattern('http://example.com');

    assert.strictEqual(urlNotification.storage.getCount(), 3);
  });

  it('全件取得', function () {
    const all = urlNotification.storage.getAll();

    assert.strictEqual(all.length, 3);
    assert.strictEqual(all[0].msg, '1');
    assert.strictEqual(all[1].msg, '2');
    assert.strictEqual(all[2].msg, '3');
  });

  it('URLで検索 該当データなし', function () {
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/'), null);
  });

  it('URLで検索 該当データあり', function () {
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '2');
  });

  it('データ更新 - 該当データ無し', function () {
    urlNotification.storage.updatePattern('http://example.com', {
      url: 'http://example.com',
      msg: '!',
    });

    assert.strictEqual(urlNotification.storage.getCount(), 3);
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/1').msg, '1');
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '2');
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/3').msg, '3');
  });

  it('データ更新 - 該当データ有り', function () {
    urlNotification.storage.updatePattern('http://example.com/2', {
      url: 'http://example.com/2',
      msg: '!',
    });

    assert.strictEqual(urlNotification.storage.getCount(), 3);
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/1').msg, '1');
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '!');
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/3').msg, '3');
  });
});
