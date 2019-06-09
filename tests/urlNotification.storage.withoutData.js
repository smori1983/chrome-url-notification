QUnit.module('urlNotification.storage.withoutData', {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('全件取得 - ローカルストレージにデータなし', function(assert) {
  assert.strictEqual(urlNotification.storage.getAll().length, 0);
});

QUnit.test('初期状態の件数', function(assert) {
  assert.strictEqual(urlNotification.storage.getCount(), 0);
});

QUnit.test('パターンの重複登録はできない', function(assert) {
  urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
  urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
  urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });

  assert.strictEqual(urlNotification.storage.getCount(), 1);
});
