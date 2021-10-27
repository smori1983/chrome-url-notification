const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');
const migration = require('../../../src/js/urlNotification/migration');
const storage = require('../../../src/js/urlNotification/storage');

module.exports.runNoData = (version) => {
  it('execute migration', () => {
    testUtil.initStorage(version, []);

    migration.execute();

    assert.deepStrictEqual(storage.getAll(), []);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
};

module.exports.run = (version) => {
  it('current version', () => {
    assert.strictEqual(migration.currentVersion(), version);
  });

  it('migrated version', () => {
    migration.execute();

    assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
  });
};
