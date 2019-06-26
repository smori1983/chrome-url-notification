const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.storage.withoutData', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('全データ削除', function () {
    urlNotification.storage.deleteAll();

    assert.strictEqual(urlNotification.storage.getCount(), 0);
  });

  it('全件取得', function () {
    assert.strictEqual(urlNotification.storage.getAll().length, 0);
  });

  it('初期状態の件数', function () {
    assert.strictEqual(urlNotification.storage.getCount(), 0);
  });

  it('URLで検索 該当データなし', function () {
    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/'), null);
  });

  it('データ更新 - 該当データ無し', function () {
    const item = {
      url: 'http://example.com/',
      msg: '!',
      backgroundColor: '000000',
      displayPosition: 'top',
    };

    urlNotification.storage.updatePattern('http://example.com/', item);

    assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/'), null);
  });

  it('パターンの重複登録はできない', function () {
    const item = {
      url: 'http://example.com/1',
      msg: '1',
      backgroundColor: '000000',
      displayPosition: 'top',
    };

    urlNotification.storage.addPattern(item);
    urlNotification.storage.addPattern(item);
    urlNotification.storage.addPattern(item);

    assert.strictEqual(urlNotification.storage.getCount(), 1);
  });
});
