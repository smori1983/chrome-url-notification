const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/background');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigrate = require('./shared/migrate');

describe('urlNotification.background.migrate.from.3', () => {
  describe('no data', () => {
    sharedMigrate.runNoData('3');
  });

  describe('with data', () => {
    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        from: {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 0},
        to:   {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 0},
      },
      {
        from: {url: 'example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'bottom', status: 1},
        to:   {url: 'example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'bottom', status: 1},
      },
      {
        from: {url: 'example.com/4', msg: '4', backgroundColor: '444444', displayPosition: 'bottom', status: 0},
        to:   {url: 'example.com/4', msg: '4', backgroundColor: '444444', displayPosition: 'bottom', status: 0},
      },
    ]).it('migrate', (arg) => {
      testUtil.setUpStorage('3', [arg.from]);

      SUT.migrate();

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
      assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
    });
  });
});
