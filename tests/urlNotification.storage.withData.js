QUnit.module('urlNotification.storage.withData', {
  beforeEach: function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2' });
    urlNotification.storage.addPattern({ url: 'http://example.com/3', msg: '3' });
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('全データ削除', function(assert) {
  urlNotification.storage.deleteAll();

  assert.strictEqual(urlNotification.storage.getCount(), 0);
});

QUnit.test('1件削除 - 該当データ有り', function(assert) {
  urlNotification.storage.deletePattern('http://example.com/1');

  assert.strictEqual(urlNotification.storage.getCount(), 2);
});

QUnit.test('1件削除 - 該当データ無し', function(assert) {
  urlNotification.storage.deletePattern('http://example.com');

  assert.strictEqual(urlNotification.storage.getCount(), 3);
});

QUnit.test('全件取得', function(assert) {
  const all = urlNotification.storage.getAll();

  assert.strictEqual(all.length, 3);
  assert.strictEqual(all[0].msg, '1');
  assert.strictEqual(all[1].msg, '2');
  assert.strictEqual(all[2].msg, '3');
});

QUnit.test('URLで検索 該当データなし', function(assert) {
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/'), null);
});

QUnit.test('URLで検索 該当データあり', function(assert) {
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '2');
});

QUnit.test('データ更新 - 該当データ無し', function(assert) {
  urlNotification.storage.updatePattern('http://example.com', {
    url: 'http://example.com',
    msg: '!',
  });

  assert.strictEqual(urlNotification.storage.getCount(), 3);
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/1').msg, '1');
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '2');
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/3').msg, '3');
});

QUnit.test('データ更新 - 該当データ有り', function(assert) {
  urlNotification.storage.updatePattern('http://example.com/2', {
    url: 'http://example.com/2',
    msg: '!',
  });

  assert.strictEqual(urlNotification.storage.getCount(), 3);
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/1').msg, '1');
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/2').msg, '!');
  assert.strictEqual(urlNotification.storage.findByUrl('http://example.com/3').msg, '3');
});
