const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v2', () => {
  describe('import v2 and migrate to v4', () => {
    given([
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      },
    ]).it('without existing data', (arg) => {
      testUtil.clearStorage();

      SUT.importJson({version: 2, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
    });

    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top'},
        item: {url: 'example.com/1', msg: '2', backgroundColor: 'ffffff', displayPosition: 'top'},
        to:   {url: 'example.com/1', msg: '2', backgroundColor: 'ffffff', displayPosition: 'top', status: 1},
      },
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top'},
        item: {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom'},
        to:   {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 1},
      },
    ]).it('with existing data', (arg) => {
      testUtil.setUpStorage('2', [arg.from]);

      SUT.importJson({ version: 2, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
    });
  });
});
