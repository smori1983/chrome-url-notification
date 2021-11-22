const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Importer = require('../../src/js/notification/importer');
const Storage = require('../../src/js/notification/storage');

describe('urlNotification.importer.v3', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {Importer}
   */
  let SUT;

  beforeEach(() => {
    storage = new Storage();
    SUT = new Importer();
  });

  describe('import v3 and migrate to v4', () => {
    given([
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        item: {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        to:   {url: 'example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      },
    ]).it('without existing data', (arg) => {
      testUtil.clearStorage();

      SUT.importJson({version: 3, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getCollection().get(), [arg.to]);
    });

    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      },
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top',    status: 1},
        item: {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        to:   {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
      },
    ]).it('with existing data', (arg) => {
      testUtil.initStorage('3', [arg.from]);

      SUT.importJson({version: 3, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getCollection().get(), [arg.to]);
    });
  });
});
