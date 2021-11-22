const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Migration = require('../../src/js/notification/migration');
const Storage = require('../../src/js/notification/storage');

describe('urlNotification.storage.withoutData', () => {
  /**
   * @type {Storage}
   */
  let SUT;

  beforeEach(() => {
    testUtil.clearStorage();

    SUT = new Storage();

    const migration = new Migration();
    migration.execute();
  });

  describe('delete', () => {
    it('delete all items', () => {
      SUT.deleteAll();

      assert.strictEqual(SUT.getCollection().count(), 0);
    });

    it('delete 1 item - no matching data', () => {
      SUT.deletePattern('https://example.com/');

      assert.strictEqual(SUT.getCollection().count(), 0);
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

      assert.strictEqual(SUT.getCollection().count(), 1);
    });
  });
});
