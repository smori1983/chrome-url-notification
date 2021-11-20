const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/url-notification/migration');
const storage = require('../../src/js/url-notification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.3', () => {
  describe('no data', () => {
    sharedMigration.runNoData('3');
  });

  describe('shared patterns', () => {
    beforeEach(() => {
      testUtil.initStorage('3', [
        {url: 'example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1},
      ]);
    });

    sharedMigration.run(3);
  });

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
  ]).it('migrated pattern', (arg) => {
    testUtil.initStorage('3', [arg.from]);

    SUT.execute();

    assert.deepStrictEqual(storage.getAll(), [arg.to]);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
});
