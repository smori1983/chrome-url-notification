const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');
const Migration = require('../../../src/js/url-notification/migration');
const storage = require('../../../src/js/url-notification/storage');

module.exports.runNoData = (version) => {
  it('execute migration', () => {
    testUtil.initStorage(version, []);

    const migration = new Migration();
    migration.execute();

    assert.deepStrictEqual(storage.getAll(), []);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
};

module.exports.run = (version) => {
  it('current version', () => {
    const migration = new Migration();

    assert.strictEqual(migration.currentVersion(), version);
  });

  it('migrated version', () => {
    const migration = new Migration();
    migration.execute();

    assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
  });
};
