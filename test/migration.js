const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.migration', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('urlNotification.migration.hasVersion - キーなし', function () {
    const result = urlNotification.migration.hasVersion();

    assert.strictEqual(result, false);
  });

  it('urlNotification.migration.hasVersion - キーあり - 不正値 - 小数', function () {
    localStorage.setItem('version', 1.1);

    const result = urlNotification.migration.hasVersion();

    assert.strictEqual(result, false);
  });

  it('urlNotification.migration.hasVersion - キーあり - 不正値 - 文字列', function () {
    localStorage.setItem('version', 'foo');

    const result = urlNotification.migration.hasVersion();

    assert.strictEqual(result, false);
  });

  it('urlNotification.migration.hasVersion - キーあり - 正常値', function () {
    localStorage.setItem('version', 1);

    const result = urlNotification.migration.hasVersion();

    assert.strictEqual(result, true);
  });

  it('urlNotification.migration.currentVersion - キーなし', function () {
    const result = urlNotification.migration.currentVersion();

    assert.strictEqual(result, 0);
  });

  it('urlNotification.migration.currentVersion - キーあり - 不正値 - 小数', function () {
    localStorage.setItem('version', 1.1);

    const result = urlNotification.migration.currentVersion();

    assert.strictEqual(result, 0);
  });

  it('urlNotification.migration.currentVersion - キーあり - 不正値 - 文字列', function () {
    localStorage.setItem('version', 'foo');

    const result = urlNotification.migration.currentVersion();

    assert.strictEqual(result, 0);
  });

  it('urlNotification.migration.currentVersion - キーあり - 正常値', function () {
    localStorage.setItem('version', 1);

    const result = urlNotification.migration.currentVersion();

    assert.strictEqual(result, 1);
  });
});

describe('urlNotification.migration.0to1', function() {
  beforeEach(function () {
    localStorage.clear();

    urlNotification.storage.addPattern({url: 'http://example.com/1', msg: '1'});
  });

  it('urlNotification.migration - version 0', function () {
    const result = urlNotification.migration.currentVersion();

    assert.strictEqual(result, 0);
  });

  it('urlNotification.migration - version 0 to 1', function () {
    const expectedBefore = [
      {url: 'http://example.com/1', msg: '1'},
    ];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expectedBefore);

    assert.strictEqual(urlNotification.migration.shouldMigrate(), true);

    urlNotification.migration.migrateFrom(0);

    const expectedAfter = [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000'},
    ];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expectedAfter);

    assert.strictEqual(urlNotification.migration.currentVersion(), 1);
  });
});
