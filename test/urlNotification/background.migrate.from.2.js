const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigrate = require('./shared/migrate');

describe('urlNotification.background.migrate.from.2', function() {
  describe('no data', function() {
    sharedMigrate.runNoData('2');
  });

  describe('with data', function() {
    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        from: {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom'},
        to:   {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 1},
      },
      {
        from: {url: 'example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top'},
        to:   {url: 'example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1},
      },
    ]).it('migrate', function (arg) {
      testUtil.setUpStorage('2', [arg.from]);

      SUT.migrate();

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
      assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
    });
  });
});
