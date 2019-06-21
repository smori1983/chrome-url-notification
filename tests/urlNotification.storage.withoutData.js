QUnit.module('urlNotification.storage.withoutData', {
  beforeEach: function() {
    this.urlNotification = require('url-notification');

    localStorage.clear();
  },
});

QUnit.test('全件取得 - ローカルストレージにデータなし', function(assert) {
  assert.strictEqual(this.urlNotification.storage.getAll().length, 0);
});

QUnit.test('初期状態の件数', function(assert) {
  assert.strictEqual(this.urlNotification.storage.getCount(), 0);
});

QUnit.test('パターンの重複登録はできない', function(assert) {
  this.urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
  this.urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
  this.urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });

  assert.strictEqual(this.urlNotification.storage.getCount(), 1);
});
