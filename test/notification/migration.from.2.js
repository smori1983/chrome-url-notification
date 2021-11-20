const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Migration = require('../../src/js/notification/migration');
const Storage = require('../../src/js/notification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.2', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {Migration}
   */
  let SUT;

  beforeEach(() => {
    storage = new Storage();
    SUT = new Migration();
  });

  describe('no data', () => {
    sharedMigration.runNoData('2');
  });

  describe('shared patterns', () => {
    beforeEach(() => {
      testUtil.initStorage('2', [
        {url: 'example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom'},
      ]);
    });

    sharedMigration.run(2);
  });

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
  ]).it('migrated pattern', (arg) => {
    testUtil.initStorage('2', [arg.from]);

    SUT.execute();

    assert.deepStrictEqual(storage.getAll(), [arg.to]);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
});
