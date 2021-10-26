const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.1', () => {
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
  ]).it('migrated pattern', (arg) => {
    testUtil.initStorage('1', [arg.from]);

    SUT.execute();

    assert.deepStrictEqual(storage.getAll(), [arg.to]);
  });
});
