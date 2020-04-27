const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.1', function() {
  beforeEach(function () {
    testUtil.setUpStorage('1', [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000'},
    ]);
  });

  sharedMigration.run(1);

  it('migrated pattern', function () {
    SUT.execute();

    const expected = [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1},
    ];

    assert.deepStrictEqual(storage.getAll(), expected);
  });
});
