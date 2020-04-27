const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.migration.from.0', function() {
  beforeEach(function () {
    testUtil.setUpStorage('', [
      {url: 'http://example.com/1', msg: '1'},
    ]);
  });

  it('current version', function () {
    assert.strictEqual(SUT.currentVersion(), 0);
  });

  it('migrated version', function () {
    SUT.execute();

    assert.strictEqual(SUT.currentVersion(), testUtil.currentVersion());
  });

  it('migrated pattern', function () {
    SUT.execute();

    const expected = [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1},
    ];

    assert.deepStrictEqual(storage.getAll(), expected);
  });
});
