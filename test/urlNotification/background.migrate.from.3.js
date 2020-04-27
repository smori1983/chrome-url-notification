const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');
const migration = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.background.migrate.from.3', function() {
  describe('no data', function() {
    it('migrate', function () {
      testUtil.setUpStorage('3', []);

      SUT.migrate();

      assert.deepStrictEqual(storage.getAll(), []);
      assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
    });
  });

  describe('with data', function() {
    beforeEach(function () {
      testUtil.setUpStorage('3', [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top',    status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top',    status: 1 },
      ]);
    });

    it('migrate', function() {
      SUT.migrate();

      const expected = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top',    status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top',    status: 1 },
      ];

      assert.deepStrictEqual(storage.getAll(), expected);

      assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
    });
  });
});
