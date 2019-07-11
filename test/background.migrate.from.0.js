const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

const expectedVersion = 3;

describe('urlNotification.background.migrate.from.0', function () {
  describe('no data', function() {
    it('migrate', function () {
      testUtil.clearStorage();

      SUT.background.migrate();

      const expected = [];

      assert.deepStrictEqual(SUT.storage.getAll(), expected);

      assert.strictEqual(SUT.migration.currentVersion(), expectedVersion);
    });
  });

  describe('with data', function() {
    beforeEach(function () {
      testUtil.setUpStorage('', [
        { url: 'http://example.com/1', msg: '1' },
        { url: 'http://example.com/2', msg: '2' },
        { url: 'http://example.com/3', msg: '3' },
      ]);
    });

    it('migrate', function () {
      SUT.background.migrate();

      const expected = [
        { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/2', msg: '2', backgroundColor: '000000', displayPosition: 'top', status: 1 },
        { url: 'http://example.com/3', msg: '3', backgroundColor: '000000', displayPosition: 'top', status: 1 },
      ];

      assert.deepStrictEqual(SUT.storage.getAll(), expected);

      assert.strictEqual(SUT.migration.currentVersion(), expectedVersion);
    });
  });
});
