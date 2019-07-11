const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

describe('urlNotification.importer.v2', function() {
  describe('import v2 and migrate to v3 - case 1', function () {
    it('without existing data - case1', function () {
      testUtil.clearStorage();

      const json = {
        version: 2,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
            displayPosition: 'top',
          },
        ],
      };

      urlNotification.importer.importJson(json);

      const allData = urlNotification.storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'top');
      assert.strictEqual(allData[0].status, 1);
    });

    it('without existing data - case2', function () {
      testUtil.clearStorage();

      const json = {
        version: 2,
        pattern: [
          {
            url: 'http://example.com/2',
            msg: '2',
            backgroundColor: '222222',
            displayPosition: 'bottom',
          },
        ],
      };

      urlNotification.importer.importJson(json);

      const allData = urlNotification.storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/2');
      assert.strictEqual(allData[0].msg, '2');
      assert.strictEqual(allData[0].backgroundColor, '222222');
      assert.strictEqual(allData[0].displayPosition, 'bottom');
      assert.strictEqual(allData[0].status, 1);
    });

    it('with existing data', function () {
      testUtil.setUpStorage('2', [
        {
          url: 'http://example.com/1',
          msg: '1',
          backgroundColor: '111111',
          displayPosition: 'top',
        },
      ]);

      const json = {
        version: 2,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1-edit',
            backgroundColor: '222222',
            displayPosition: 'bottom',
          },
        ],
      };

      urlNotification.importer.importJson(json);

      const allData = urlNotification.storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1-edit');
      assert.strictEqual(allData[0].backgroundColor, '222222');
      assert.strictEqual(allData[0].displayPosition, 'bottom');
      assert.strictEqual(allData[0].status, 1);
    });
  });
});
