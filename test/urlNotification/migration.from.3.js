const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');
const sharedMigration = require('./shared/migration');

describe('urlNotification.migration.from.3', function() {
  beforeEach(function () {
    testUtil.setUpStorage('3', [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1},
    ]);
  });

  sharedMigration.run(3);

  it('migrated pattern', function () {
    SUT.execute();

    const expected = [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1},
    ];

    assert.deepStrictEqual(storage.getAll(), expected);
  });
});
