const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const SUT = require('../../src/js/urlNotification/importer');
const storage = require('../../src/js/urlNotification/storage');

describe('urlNotification.importer.v4', function() {
  describe('import v4', function () {
    it('without existing data - displayPosition is top', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'top',
            status: 1,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'top');
      assert.strictEqual(allData[0].status, 1);
    });

    it('without existing data - displayPosition is bottom', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'bottom',
            status: 1,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'bottom');
      assert.strictEqual(allData[0].status, 1);
    });

    it('without existing data - displayPosition is top_left', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'top_left',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'top_left');
      assert.strictEqual(allData[0].status, 0);
    });

    it('without existing data - displayPosition is top_right', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'top_right',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'top_right');
      assert.strictEqual(allData[0].status, 0);
    });

    it('without existing data - displayPosition is bottom_left', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'bottom_left',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'bottom_left');
      assert.strictEqual(allData[0].status, 0);
    });

    it('without existing data - displayPosition is bottom_right', function () {
      testUtil.clearStorage();

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'bottom_right',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'bottom_right');
      assert.strictEqual(allData[0].status, 0);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('4', [
        {
          url: 'http://example.com/1',
          msg: '1',
          backgroundColor: '111111',
          displayPosition: 'top_left',
          status: 1,
        },
      ]);

      const json = {
        version: 4,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1-edit',
            backgroundColor: '222222',
            displayPosition: 'bottom_right',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1-edit');
      assert.strictEqual(allData[0].backgroundColor, '222222');
      assert.strictEqual(allData[0].displayPosition, 'bottom_right');
      assert.strictEqual(allData[0].status, 0);
    });
  });
});
