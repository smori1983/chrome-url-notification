const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');

describe('urlNotification.migration.version', () => {
  describe('handling of version data', () => {
    it('key not defined', () => {
      testUtil.clearStorage();

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is true as string', () => {
      testUtil.setUpStorage('true', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is float as string', () => {
      testUtil.setUpStorage('1.1', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is string', () => {
      testUtil.setUpStorage('foo', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('valid', () => {
      testUtil.setUpStorage('1', []);

      assert.strictEqual(SUT.hasVersion(), true);
      assert.strictEqual(SUT.currentVersion(), 1);
    });
  });
});
