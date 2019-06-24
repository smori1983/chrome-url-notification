const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.importer.v1', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('import v1 and migrate to v2', function () {
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

    urlNotification.importer.importJson(json);

    const allData = urlNotification.storage.getAll();

    assert.strictEqual(allData.length, 1);

    assert.strictEqual(allData[0].url, 'http://example.com/1');
    assert.strictEqual(allData[0].msg, '1');
    assert.strictEqual(allData[0].backgroundColor, '111111');
    assert.strictEqual(allData[0].displayPosition, 'top');
  });
});
