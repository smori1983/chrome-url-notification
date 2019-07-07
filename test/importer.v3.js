const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.importer.v3', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('import v3 - case 1', function () {
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

    urlNotification.importer.importJson(json);

    const allData = urlNotification.storage.getAll();

    assert.strictEqual(allData.length, 1);

    assert.strictEqual(allData[0].url, 'http://example.com/1');
    assert.strictEqual(allData[0].msg, '1');
    assert.strictEqual(allData[0].backgroundColor, '111111');
    assert.strictEqual(allData[0].displayPosition, 'top');
    assert.strictEqual(allData[0].status, 1);
  });

  it('import v3 - case 2', function () {
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

    urlNotification.importer.importJson(json);

    const allData = urlNotification.storage.getAll();

    assert.strictEqual(allData.length, 1);

    assert.strictEqual(allData[0].url, 'http://example.com/2');
    assert.strictEqual(allData[0].msg, '2');
    assert.strictEqual(allData[0].backgroundColor, '222222');
    assert.strictEqual(allData[0].displayPosition, 'bottom');
    assert.strictEqual(allData[0].status, 0);
  });
});