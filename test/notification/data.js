const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Data = require('../../src/js/notification/data');

describe('urlNotification.data', () => {
  /**
   * @type {Data}
   */
  let SUT;

  beforeEach(() => {
    testUtil.clearStorage();
    SUT = new Data();
  });

  describe('updatePattern()', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'https://example.com/1', msg: '1'}),
        testUtil.makePatternItem({url: 'https://example.com/2', msg: '2'}),
        testUtil.makePatternItem({url: 'https://example.com/3', msg: '3'}),
        testUtil.makePatternItem({url: 'https://example.com/item/*', msg: 'item'}),
      ]);
    });

    it('Call with non-existing pattern', () => {
      const result = SUT.updatePattern('https://example.com/999', {
        status: 0,
      });

      assert.strictEqual(result, false);
    });

    it('Normal case', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        status: 0,
      });

      assert.strictEqual(result, true);
    });

    it('Try to update with invalid value', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        status: 9,
      });

      assert.strictEqual(result, false);
    });

    it('Try to update with invalid key', () => {
      const result = SUT.updatePattern('https://example.com/1', {
        foo: 'bar',
      });

      assert.strictEqual(result, false);
    });
  });
});
