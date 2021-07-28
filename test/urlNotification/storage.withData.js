const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/storage');
const background = require('../../src/js/urlNotification/background');

describe('urlNotification.storage.withData', () => {
  beforeEach(() => {
    testUtil.clearStorage();

    SUT.addPattern({url: 'http://example.com/1', msg: '1'});
    SUT.addPattern({url: 'http://example.com/2', msg: '2'});
    SUT.addPattern({url: 'http://example.com/3', msg: '3'});

    background.migrate();
  });

  describe('delete', () => {
    it('delete all data', () => {
      SUT.deleteAll();

      assert.strictEqual(SUT.getCount(), 0);
    });

    it('delete 1 item - has matching data', () => {
      SUT.deletePattern('http://example.com/1');

      assert.strictEqual(SUT.getCount(), 2);
    });

    it('delete 1 item - no matching data', () => {
      SUT.deletePattern('http://example.com/');

      assert.strictEqual(SUT.getCount(), 3);
    });
  });

  describe('read', () => {
    it('get all items', () => {
      const all = SUT.getAll();

      assert.strictEqual(all.length, 3);
      assert.strictEqual(all[0].msg, '1');
      assert.strictEqual(all[1].msg, '2');
      assert.strictEqual(all[2].msg, '3');
    });

    it('find by url - no matching data', () => {
      assert.strictEqual(SUT.findByUrl('http://example.com/'), null);
    });

    it('find by url - has matching data', () => {
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '2');
    });
  });

  describe('update', () => {
    it('update data - no matching data', () => {
      SUT.updatePattern('http://example.com/', {
        url: 'http://example.com/',
        msg: '!',
      });

      assert.strictEqual(SUT.getCount(), 3);
      assert.strictEqual(SUT.findByUrl('http://example.com/1').msg, '1');
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '2');
      assert.strictEqual(SUT.findByUrl('http://example.com/3').msg, '3');
    });

    it('update data - has matching data', () => {
      SUT.updatePattern('http://example.com/2', {
        url: 'http://example.com/2',
        msg: '!',
      });

      assert.strictEqual(SUT.getCount(), 3);
      assert.strictEqual(SUT.findByUrl('http://example.com/1').msg, '1');
      assert.strictEqual(SUT.findByUrl('http://example.com/2').msg, '!');
      assert.strictEqual(SUT.findByUrl('http://example.com/3').msg, '3');
    });
  });
});
