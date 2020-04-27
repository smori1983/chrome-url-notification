const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v3', function() {
  describe('import v3 and migrate to v4', function () {
    it('without existing data - case 1 - status is 1', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 3, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - case 2 - status is 0', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 3, pattern: [
        {url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      ]});

      const expected = [
        {url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('3', [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ]);

      SUT.importJson({version: 3, pattern: [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });
  });
});
