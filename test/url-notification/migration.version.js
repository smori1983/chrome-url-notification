const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Migration = require('../../src/js/notification/migration');

describe('urlNotification.migration.version', () => {
  /**
   * @type {Migration}
   */
  let SUT;

  beforeEach(() => {
    SUT = new Migration();
  });

  describe('handling of version data', () => {
    it('key not defined', () => {
      testUtil.clearStorage();

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is true as string', () => {
      testUtil.initStorage('true', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is float as string', () => {
      testUtil.initStorage('1.1', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is string', () => {
      testUtil.initStorage('foo', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('valid', () => {
      testUtil.initStorage('1', []);

      assert.strictEqual(SUT.hasVersion(), true);
      assert.strictEqual(SUT.currentVersion(), 1);
    });
  });
});
