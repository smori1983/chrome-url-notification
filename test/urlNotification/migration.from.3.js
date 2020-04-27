const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.migration.from.3', function() {
  beforeEach(function () {
    testUtil.setUpStorage('3', [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1},
    ]);
  });

  it('current version', function () {
    assert.strictEqual(SUT.currentVersion(), 3);
  });

  it('migrated version', function () {
    SUT.execute();

    assert.strictEqual(SUT.currentVersion(), testUtil.currentVersion());
  });

  it('migrated pattern', function () {
    SUT.execute();

    const expectedAfter = [
      {url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'bottom', status: 1},
    ];

    assert.deepStrictEqual(storage.getAll(), expectedAfter);
  });
});
