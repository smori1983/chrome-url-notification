const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');
const background = require('../../../src/js/urlNotification/background');
const storage = require('../../../src/js/urlNotification/storage');

/**
 * @param {string} version
 */
module.exports.runNoData = (version) => {
  it('migrate', () => {
    testUtil.setUpStorage(version, []);

    background.migrate();

    assert.deepStrictEqual(storage.getAll(), []);
    assert.strictEqual(storage.currentVersion(), testUtil.currentVersion());
  });
};
