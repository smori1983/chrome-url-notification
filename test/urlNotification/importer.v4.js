const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v4', function() {
  describe('import v4', function () {
    it('without existing data - displayPosition is top', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - displayPosition is bottom', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - displayPosition is top_left', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - displayPosition is top_right', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_right', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_right', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - displayPosition is bottom_left', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_left', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_left', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - displayPosition is bottom_right', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_right', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_right', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('4', [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
      ]);

      SUT.importJson({version: 4, pattern: [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom_right', status: 0},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom_right', status: 0},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });
  });
});
