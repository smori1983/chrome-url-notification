const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Migration = require('../../src/js/notification/migration');
const Storage = require('../../src/js/notification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.1', () => {
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
    sharedMigration.runNoData('1');
  });

  describe('shared patterns', () => {
    beforeEach(() => {
      testUtil.initStorage('1', [
        {url: 'example.com/1', msg: '1', backgroundColor: '000000'},
      ]);
    });

    sharedMigration.run(1);
  });

  given([
    {
      from: {url: 'example.com/1', msg: '1', backgroundColor: '111111'},
      to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
    },
    {
      from: {url: 'example.com/2', msg: '2', backgroundColor: '222222'},
      to:   {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 1},
    },
    {
      from: {url: 'example.com/3', msg: '3', backgroundColor: '333333'},
      to:   {url: 'example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1},
    },
  ]).it('migrated pattern', (arg) => {
    testUtil.initStorage('1', [arg.from]);

    SUT.execute();

    assert.deepStrictEqual(storage.getAll(), [arg.to]);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
});
