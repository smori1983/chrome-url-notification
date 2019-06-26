const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.finder', function() {
  beforeEach(function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2' });
    urlNotification.storage.addPattern({ url: 'http://example.com/*', msg: '*' });

    urlNotification.storage.addPattern({ url: 'http://abc-123.net/1', msg: 'abc-123-1' });
    urlNotification.storage.addPattern({ url: 'http://abc-123.net/*', msg: 'abc-123-0' });

    urlNotification.storage.addPattern({ url: 'http://*.example.com/', msg: 'subdomain-1' });

    urlNotification.background.migrate();
  });

  it('URLで検索 該当データなし', function() {
    const result = urlNotification.finder.findFor('http://example.com/');

    assert.strictEqual(result, null);
  });

  it('URLで検索 *パターンにマッチ', function() {
    const result = urlNotification.finder.findFor('http://example.com/3');

    const expected = {
      url: 'http://example.com/*',
      msg: '*',
      backgroundColor: '000000',
      displayPosition: 'top',
    };

    assert.deepStrictEqual(result, expected);
  });

  it('URLで検索 部分一致', function() {
    const result = urlNotification.finder.findFor('http://example.com/1/1.html');

    const expected = {
      url: 'http://example.com/1',
      msg: '1',
      backgroundColor: '000000',
      displayPosition: 'top',
    };

    assert.deepStrictEqual(result, expected);
  });

  it('URLで検索 エスケープ処理 : -', function() {
    const result = urlNotification.finder.findFor('http://abc-123.net/1.html');

    assert.strictEqual(result.msg, 'abc-123-1');
  });

  it('URLで検索 *パターンエスケープ処理 : -', function() {
    const result = urlNotification.finder.findFor('http://a-b-c.example.com/');

    assert.strictEqual(result.msg, 'subdomain-1');
  });
});
