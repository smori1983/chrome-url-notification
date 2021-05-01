const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');
const migration = require('../../../src/js/urlNotification/migration');

module.exports.run = (version) => {
  it('current version', () => {
    assert.strictEqual(migration.currentVersion(), version);
  });

  it('migrated version', () => {
    migration.execute();

    assert.strictEqual(migration.currentVersion(), testUtil.currentVersion());
  });
};
