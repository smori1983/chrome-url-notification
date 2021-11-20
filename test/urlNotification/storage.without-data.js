const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/storage');
const migration = require('../../src/js/urlNotification/migration');

describe('urlNotification.storage.withoutData', () => {
  beforeEach(() => {
    testUtil.clearStorage();

    migration.execute();
  });

  describe('delete', () => {
    it('delete all items', () => {
      SUT.deleteAll();

      assert.strictEqual(SUT.getCount(), 0);
    });

    it('delete 1 item - no matching data', () => {
      SUT.deletePattern('https://example.com/');

      assert.strictEqual(SUT.getCount(), 0);
    });
  });

  describe('read', () => {
    it('get all items', () => {
      const all = SUT.getAll();

      assert.strictEqual(all.length, 0);
    });

    it('find by url - no matching data', () => {
      assert.strictEqual(SUT.findByUrl('https://example.com/'), null);
    });
  });

  describe('update', () => {
    it('update data - no matching data', () => {
      const item = {
        url: 'https://example.com/',
        msg: '!',
        backgroundColor: '000000',
        displayPosition: 'top',
      };

      SUT.updatePattern('https://example.com/', item);

      assert.strictEqual(SUT.findByUrl('https://example.com/'), null);
    });

    it('duplicated pattern cannot be registered', () => {
      const item = {
        url: 'https://example.com/1',
        msg: '1',
        backgroundColor: '000000',
        displayPosition: 'top',
      };

      SUT.addPattern(item);
      SUT.addPattern(item);
      SUT.addPattern(item);

      assert.strictEqual(SUT.getCount(), 1);
    });
  });
});
