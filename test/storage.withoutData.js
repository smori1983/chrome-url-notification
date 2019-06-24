const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.storage.withoutData', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('全件取得 - ローカルストレージにデータなし', function () {
    assert.strictEqual(urlNotification.storage.getAll().length, 0);
  });

  it('初期状態の件数', function () {
    assert.strictEqual(urlNotification.storage.getCount(), 0);
  });

  it('パターンの重複登録はできない', function () {
    urlNotification.storage.addPattern({url: 'http://example.com/1', msg: '1'});
    urlNotification.storage.addPattern({url: 'http://example.com/1', msg: '1'});
    urlNotification.storage.addPattern({url: 'http://example.com/1', msg: '1'});

    assert.strictEqual(urlNotification.storage.getCount(), 1);
  });
});
