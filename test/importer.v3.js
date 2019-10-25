const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../test_lib/util');
const SUT = require('../src/js/urlNotification/importer');
const storage = require('../src/js/urlNotification/storage');

describe('urlNotification.importer.v3', function() {
  describe('import v3', function () {
    it('without existing data - case 1 - status is 1', function () {
      testUtil.clearStorage();

      const json = {
        version: 3,
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

    it('without existing data - case 2 - status is 0', function () {
      testUtil.clearStorage();

      const json = {
        version: 3,
        pattern: [
          {
            url: 'http://example.com/2',
            msg: '2',
            backgroundColor: '222222',
            displayPosition: 'bottom',
            status: 0,
          },
        ],
      };

      SUT.importJson(json);

      const allData = storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/2');
      assert.strictEqual(allData[0].msg, '2');
      assert.strictEqual(allData[0].backgroundColor, '222222');
      assert.strictEqual(allData[0].displayPosition, 'bottom');
      assert.strictEqual(allData[0].status, 0);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('3', [
        {
          url: 'http://example.com/1',
          msg: '1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);

      const json = {
        version: 3,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1-edit',
            backgroundColor: '222222',
            displayPosition: 'bottom',
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
      assert.strictEqual(allData[0].displayPosition, 'bottom');
      assert.strictEqual(allData[0].status, 0);
    });
  });
});
