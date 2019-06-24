const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.importer.v2', function() {
  beforeEach(function () {
    localStorage.clear();
  });

  it('import v2 - case 1', function () {
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
  });

  it('import v2 - case 2', function () {
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
  });
});
