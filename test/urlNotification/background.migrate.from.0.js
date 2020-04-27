const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigrate = require('./shared/migrate');

describe('urlNotification.background.migrate.from.0', function () {
  describe('no data', function() {
    sharedMigrate.runNoData('');
  });

  describe('with data', function() {
    beforeEach(function () {
      testUtil.setUpStorage('', [
        {url: 'http://example.com/1', msg: '1'},
        {url: 'http://example.com/2', msg: '2'},
        {url: 'http://example.com/3', msg: '3'},
      ]);
    });

    it('migrate', function () {
      SUT.migrate();

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1},
        {url: 'http://example.com/2', msg: '2', backgroundColor: '000000', displayPosition: 'top', status: 1},
        {url: 'http://example.com/3', msg: '3', backgroundColor: '000000', displayPosition: 'top', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
      assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
    });
  });
});
