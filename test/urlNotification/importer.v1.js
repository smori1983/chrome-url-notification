const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v1', function() {
  describe('import v1 and migrate to v4', function() {
    it('without existing data', function () {
      testUtil.clearStorage();

      SUT.importJson({version: 1, pattern: [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111'},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('1', [
        {url: 'http://example.com/1', msg: '1', backgroundColor: '111111'},
      ]);

      SUT.importJson({version: 1, pattern: [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222'},
      ]});

      const expected = [
        {url: 'http://example.com/1', msg: '1-edit', backgroundColor: '222222', displayPosition: 'top', status: 1},

      ];

      assert.deepStrictEqual(storage.getAll(), expected);
    });
  });
});
