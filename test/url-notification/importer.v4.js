const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const Importer = require('../../src/js/url-notification/importer');
const storage = require('../../src/js/url-notification/storage');

describe('urlNotification.importer.v4', () => {
  /**
   * @type {Importer}
   */
  let SUT;

  beforeEach(() => {
    SUT = new Importer();
  });

  describe('import v4', () => {
    given([
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_right', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_right', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_left', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_left', status: 1},
      },
      {
        item: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_right', status: 1},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'bottom_right', status: 1},
      },
    ]).it('without existing data', (arg) => {
      testUtil.clearStorage();

      SUT.importJson({version: 4, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
    });

    given([
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top_right', status: 0},
        item: {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top_right', status: 0},
        to:   {url: 'example.com/1', msg: '1', backgroundColor: 'ffffff', displayPosition: 'top_right', status: 0},
      },
      {
        from: {url: 'example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top_left',     status: 1},
        item: {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom_right', status: 0},
        to:   {url: 'example.com/1', msg: '2', backgroundColor: '222222', displayPosition: 'bottom_right', status: 0},
      },
    ]).it('with existing data', (arg) => {
      testUtil.initStorage('4', [arg.from]);

      SUT.importJson({version: 4, pattern: [arg.item]});

      assert.deepStrictEqual(storage.getAll(), [arg.to]);
    });
  });
});
