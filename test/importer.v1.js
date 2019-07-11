const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const SUT = require('../src/js/urlNotification/main');
const testUtil = require('../test_lib/util');

describe('urlNotification.importer.v1', function() {
  describe('import v1 and migrate to v3', function() {
    it('without existing data', function () {
      testUtil.clearStorage();

      const json = {
        version: 1,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1',
            backgroundColor: '111111',
          },
        ],
      };

      SUT.importer.importJson(json);

      const allData = SUT.storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1');
      assert.strictEqual(allData[0].backgroundColor, '111111');
      assert.strictEqual(allData[0].displayPosition, 'top');
      assert.strictEqual(allData[0].status, 1);
    });

    it('with existing data', function() {
      testUtil.setUpStorage('1', [
        {
          url: 'http://example.com/1',
          msg: '1',
          backgroundColor: '111111',
        },
      ]);

      const json = {
        version: 1,
        pattern: [
          {
            url: 'http://example.com/1',
            msg: '1-edit',
            backgroundColor: '222222',
          },
        ],
      };

      SUT.importer.importJson(json);

      const allData = SUT.storage.getAll();

      assert.strictEqual(allData.length, 1);

      assert.strictEqual(allData[0].url, 'http://example.com/1');
      assert.strictEqual(allData[0].msg, '1-edit');
      assert.strictEqual(allData[0].backgroundColor, '222222');
      assert.strictEqual(allData[0].displayPosition, 'top');
      assert.strictEqual(allData[0].status, 1);
    });
  });
});
