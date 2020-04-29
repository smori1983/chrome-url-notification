const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/migration');

describe('urlNotification.migration.version', function() {
  describe('handling of version data', function () {
    it('key not defined', function () {
      testUtil.clearStorage();

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is true as string', function () {
      testUtil.setUpStorage('true', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is float as string', function () {
      testUtil.setUpStorage('1.1', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('invalid - key is string', function () {
      testUtil.setUpStorage('foo', []);

      assert.strictEqual(SUT.hasVersion(), false);
      assert.strictEqual(SUT.currentVersion(), 0);
    });

    it('valid', function () {
      testUtil.setUpStorage('1', []);

      assert.strictEqual(SUT.hasVersion(), true);
      assert.strictEqual(SUT.currentVersion(), 1);
    });
  });
});
