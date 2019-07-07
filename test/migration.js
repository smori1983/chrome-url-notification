const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.migration', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  describe('version', function () {
    it('キーなし', function () {
      assert.strictEqual(urlNotification.migration.hasVersion(), false);
      assert.strictEqual(urlNotification.migration.currentVersion(), 0);
    });

    it('キーあり - 不正値 - 小数', function () {
      localStorage.setItem('version', '1.1');

      assert.strictEqual(urlNotification.migration.hasVersion(), false);
      assert.strictEqual(urlNotification.migration.currentVersion(), 0);
    });

    it('キーあり - 不正値 - 文字列', function () {
      localStorage.setItem('version', 'foo');

      assert.strictEqual(urlNotification.migration.hasVersion(), false);
      assert.strictEqual(urlNotification.migration.currentVersion(), 0);
    });

    it('キーあり - 正常値', function () {
      localStorage.setItem('version', '1');

      assert.strictEqual(urlNotification.migration.hasVersion(), true);
      assert.strictEqual(urlNotification.migration.currentVersion(), 1);
    });
  });

  describe('0to1', function () {
    beforeEach(function () {
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1' },
      ]));
    });

    it('current version is 0', function () {
      assert.strictEqual(urlNotification.migration.currentVersion(), 0);
    });

    it('execute migration', function () {
      const expectedBefore = [
        { url: 'http://example.com/1', msg: '1' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedBefore);

      assert.strictEqual(urlNotification.migration.shouldMigrate(), true);

      urlNotification.migration.migrateFrom(0);

      const expectedAfter = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedAfter);

      assert.strictEqual(urlNotification.migration.currentVersion(), 1);
    });
  });

  describe('1to2', function() {
    beforeEach(function() {
      localStorage.setItem('version', '1');
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000' },
      ]));
    });

    it('current version is 1', function() {
      assert.strictEqual(urlNotification.migration.currentVersion(), 1);
    });

    it('execute migration', function() {
      const expectedBefore = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedBefore);

      assert.strictEqual(urlNotification.migration.shouldMigrate(), true);

      urlNotification.migration.migrateFrom(1);

      const expectedAfter = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedAfter);

      assert.strictEqual(urlNotification.migration.currentVersion(), 2);
    });
  });

  describe('2to3', function() {
    beforeEach(function() {
      localStorage.setItem('version', '2');
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom' },
      ]));
    });

    it('current version is 2', function() {
      assert.strictEqual(urlNotification.migration.currentVersion(), 2);
    });

    it('execute migration', function() {
      const expectedBefore = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedBefore);

      assert.strictEqual(urlNotification.migration.shouldMigrate(), true);

      urlNotification.migration.migrateFrom(2);

      const expectedAfter = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1 },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expectedAfter);

      assert.strictEqual(urlNotification.migration.currentVersion(), 3);
    });
  });
});
