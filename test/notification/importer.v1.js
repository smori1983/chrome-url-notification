const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Importer = require('../../src/js/notification/importer');
const Storage = require('../../src/js/notification/storage');

describe('urlNotification.importer.v1', () => {
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

  describe('import v1 and migrate to v4', () => {
    given([
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '000000'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top', status: 1},
      },
    ]).it('without existing data', (arg) => {
      testUtil.clearStorage();

      SUT.importJson({version: 1, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getCollection().get(), [arg.to]);
    });

    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff'},
        item: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff'},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top', status: 1},
      },
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111'},
        item: {url: 'example.com/1', msg: '2', backgroundColor: '222222'},
        to:   {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'top', status: 1},
      },
    ]).it('with existing data', (arg) => {
      testUtil.initStorage('1', [arg.from]);

      SUT.importJson({version: 1, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getCollection().get(), [arg.to]);
    });
  });
});
