const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

const expectedVersion = 2;

describe('urlNotification.background.migrate.from.1', function() {
  beforeEach(function() {
    localStorage.clear();
  });

  describe('no data', function() {
    it('migrate', function () {
      urlNotification.background.migrate();

      const expected = [];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

      assert.strictEqual(urlNotification.migration.currentVersion(), expectedVersion);
    });
  });

  describe('with data', function() {
    beforeEach(function () {
      localStorage.setItem('pattern', JSON.stringify([
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111' },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222' },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333' },
      ]));
    });

    it('migrate', function() {
      urlNotification.background.migrate();

      const expected = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top' },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top' },
      ];

      assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

      assert.strictEqual(urlNotification.migration.currentVersion(), expectedVersion);
    });
  });
});
