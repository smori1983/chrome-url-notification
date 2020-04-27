const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v2', function() {
  describe('import v2 and migrate to v4', function () {
    it('without existing data - case1', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 2, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top'},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('without existing data - case2', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 2, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom'},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('with existing data', function () {
      testUtil.setUpStorage('2', [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top'},
      ]);

      SUT.importJson({ version: 2, pattern: [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom'},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'bottom', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });
  });
});
