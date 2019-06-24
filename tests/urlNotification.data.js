QUnit.module('urlNotification.data', {
  beforeEach: function() {
    localStorage.clear();

    this.urlNotification = require('url-notification');
  },
});

QUnit.test('URLソート 整数の比較', function(assert) {
  const patterns = [
    { url: 'http://example.com/2', msg: '2' },
    { url: 'http://example.com/1', msg: '1' },
    { url: 'http://example.com/3', msg: '3' },
  ];

  const sorted = this.urlNotification.data.sortByUrl(patterns);

  assert.strictEqual(sorted.length, 3);
  assert.strictEqual(sorted[0].msg, '1');
  assert.strictEqual(sorted[1].msg, '2');
  assert.strictEqual(sorted[2].msg, '3');
});

QUnit.test('URLソート 整数と\'*\'の比較', function(assert) {
  const patterns = [
    { url: 'http://example.com/2', msg: '2' },
    { url: 'http://example.com/1', msg: '1' },
    { url: 'http://example.com/*', msg: '*' },
  ];

  const sorted = this.urlNotification.data.sortByUrl(patterns);

  assert.strictEqual(sorted.length, 3);
  assert.strictEqual(sorted[0].msg, '*');
  assert.strictEqual(sorted[1].msg, '1');
  assert.strictEqual(sorted[2].msg, '2');
});

QUnit.test('メッセージソート', function(assert) {
  const patterns = [
    { url: 'http://example.com/2', msg: 'two' },
    { url: 'http://example.com/1', msg: 'three' },
    { url: 'http://example.com/3', msg: 'one' },
  ];

  const sorted = this.urlNotification.data.sortByMessage(patterns);

  assert.strictEqual(sorted.length, 3);
  assert.strictEqual(sorted[0].msg, 'one');
  assert.strictEqual(sorted[1].msg, 'three');
  assert.strictEqual(sorted[2].msg, 'two');
});
