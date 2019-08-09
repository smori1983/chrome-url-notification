const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

describe('urlNotification.background', function () {
  beforeEach(function () {
    testUtil.setUpStorage(testUtil.currentVersion(), [
      { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
      { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
      { url: 'http://example.com/3', msg: '3', backgroundColor: '333333', displayPosition: 'top', status: 1 },
      { url: 'http://example.com/item/*', msg: 'item', backgroundColor: '000000', displayPosition: 'top', status: 1 },
    ]);
  });

  it('find() - 該当データなし', function() {
    const result = SUT.background.find('foo');

    assert.strictEqual(result.matched, false);
    assert.strictEqual(result.data, null);
  });

  it('find() - 該当データあり', function() {
    const result = SUT.background.find('http://example.com/1');

    const expectedData = {
      url: 'http://example.com/1',
      message: '1',
      backgroundColor: '111111',
      fontColor: 'ffffff',
      displayPosition: 'top',
    };

    assert.strictEqual(result.matched, true);
    assert.deepStrictEqual(result.data, expectedData);
  });

  it('find() - 該当データあり - パターンにマッチ', function() {
    const result = SUT.background.find('http://example.com/item/5');

    const expectedData = {
      url: 'http://example.com/item/*',
      message: 'item',
      backgroundColor: '000000',
      fontColor: 'ffffff',
      displayPosition: 'top',
    };

    assert.strictEqual(result.matched, true);
    assert.deepStrictEqual(result.data, expectedData);
  });

  describe('updatePattern()', function () {
    it('Call with non-existing pattern', function () {
      const result = SUT.background.updatePattern('http://example.com/999', {
        status: 0,
      });

      assert.strictEqual(result, false);
    });

    it('Normal case', function () {
      const result = SUT.background.updatePattern('http://example.com/1', {
        status: 0,
      });

      assert.strictEqual(result, true);
    });

    it('Try to update with invalid value', function () {
      const result = SUT.background.updatePattern('http://example.com/1', {
        status: 9,
      });

      assert.strictEqual(result, false);
    });
  });
});
