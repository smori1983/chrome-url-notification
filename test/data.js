const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.data', function() {
  beforeEach(function() {
    localStorage.clear();
  });

  it('URLソート 整数の比較', function() {
    const patterns = [
      { url: 'http://example.com/2', msg: '2' },
      { url: 'http://example.com/1', msg: '1' },
      { url: 'http://example.com/3', msg: '3' },
    ];

    const sorted = urlNotification.data.sortByUrl(patterns);

    assert.strictEqual(sorted.length, 3);
    assert.strictEqual(sorted[0].msg, '1');
    assert.strictEqual(sorted[1].msg, '2');
    assert.strictEqual(sorted[2].msg, '3');
  });

  it('URLソート 整数と\'*\'の比較', function() {
    const patterns = [
      { url: 'http://example.com/2', msg: '2' },
      { url: 'http://example.com/1', msg: '1' },
      { url: 'http://example.com/*', msg: '*' },
    ];

    const sorted = urlNotification.data.sortByUrl(patterns);

    assert.strictEqual(sorted.length, 3);
    assert.strictEqual(sorted[0].msg, '*');
    assert.strictEqual(sorted[1].msg, '1');
    assert.strictEqual(sorted[2].msg, '2');
  });

  it('メッセージソート', function() {
    const patterns = [
      { url: 'http://example.com/2', msg: 'two' },
      { url: 'http://example.com/1', msg: 'three' },
      { url: 'http://example.com/3', msg: 'one' },
    ];

    const sorted = urlNotification.data.sortByMessage(patterns);

    assert.strictEqual(sorted.length, 3);
    assert.strictEqual(sorted[0].msg, 'one');
    assert.strictEqual(sorted[1].msg, 'three');
    assert.strictEqual(sorted[2].msg, 'two');
  });
});
