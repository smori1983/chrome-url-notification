const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/url-notification/migration');
const storage = require('../../src/js/url-notification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.0', () => {
  describe('no data', () => {
    sharedMigration.runNoData('');
  });

  describe('shared patterns', () => {
    beforeEach(() => {
      testUtil.initStorage('', [
        {url: 'example.com/1', msg: '1'},
      ]);
    });

    sharedMigration.run(0);
  });

  given([
    {
      from: {url: 'example.com/1', msg: '1'},
      to:   {url: 'example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1},
    },
    {
      from: {url: 'example.com/2', msg: '2'},
      to:   {url: 'example.com/2', msg: '2', backgroundColor: '000000', displayPosition: 'top', status: 1},
    },
    {
      from: {url: 'example.com/3', msg: '3'},
      to:   {url: 'example.com/3', msg: '3', backgroundColor: '000000', displayPosition: 'top', status: 1},
    },
  ]).it('migrated pattern', (arg) => {
    testUtil.initStorage('', [arg.from]);

    SUT.execute();

    assert.deepStrictEqual(storage.getAll(), [arg.to]);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
});