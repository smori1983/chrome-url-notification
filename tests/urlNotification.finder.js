QUnit.module('urlNotification.finder', {
  beforeEach: function() {
    localStorage.clear();

    this.urlNotification = require('url-notification');

    this.urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    this.urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2' });
    this.urlNotification.storage.addPattern({ url: 'http://example.com/*', msg: '*' });

    this.urlNotification.storage.addPattern({ url: 'http://abc-123.net/1', msg: 'abc-123-1' });
    this.urlNotification.storage.addPattern({ url: 'http://abc-123.net/*', msg: 'abc-123-0' });

    this.urlNotification.storage.addPattern({ url: 'http://*.example.com/', msg: 'subdomain-1' });

    this.urlNotification.background.migrate();
  },
});

QUnit.test('URLで検索 該当データなし', function(assert) {
  const result = this.urlNotification.finder.findFor('http://example.com/');

  assert.strictEqual(result, null);
});

QUnit.test('URLで検索 *パターンにマッチ', function(assert) {
  const result = this.urlNotification.finder.findFor('http://example.com/3');

  const expected = {
    url: 'http://example.com/*',
    msg: '*',
    backgroundColor: '000000',
    displayPosition: 'top',
  };

  assert.propEqual(result, expected);
});

QUnit.test('URLで検索 部分一致', function(assert) {
  const result = this.urlNotification.finder.findFor('http://example.com/1/1.html');

  const expected = {
    url: 'http://example.com/1',
    msg: '1',
    backgroundColor: '000000',
    displayPosition: 'top',
  };

  assert.propEqual(result, expected);
});

QUnit.test('URLで検索 エスケープ処理 : -', function(assert) {
  const result = this.urlNotification.finder.findFor('http://abc-123.net/1.html');

  assert.propEqual(result.msg, 'abc-123-1');
});

QUnit.test('URLで検索 *パターンエスケープ処理 : -', function(assert) {
  const result = this.urlNotification.finder.findFor('http://a-b-c.example.com/');

  assert.propEqual(result.msg, 'subdomain-1');
});
