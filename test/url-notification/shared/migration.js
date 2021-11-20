const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');
const Migration = require('../../../src/js/notification/migration');
const Storage = require('../../../src/js/notification/storage');

module.exports.runNoData = (version) => {
  const migration = new Migration();
  const storage = new Storage();

  it('execute migration', () => {
    testUtil.initStorage(version, []);

    migration.execute();

    assert.deepStrictEqual(storage.getAll(), []);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
};

module.exports.run = (version) => {
  const migration = new Migration();

  it('current version', () => {
    assert.strictEqual(migration.currentVersion(), version);
  });

  it('migrated version', () => {
    migration.execute();

    assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
  });
};
