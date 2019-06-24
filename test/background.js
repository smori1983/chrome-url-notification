const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('background', function () {
  beforeEach(function () {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2' });
    urlNotification.storage.addPattern({ url: 'http://example.com/3', msg: '3' });

    urlNotification.background.migrate();
  });

  it('background.find() - 該当データなし', function() {
    const result = urlNotification.background.find('foo');

    assert.strictEqual(result.matched, false);
    assert.strictEqual(result.data, null);
  });

  it('background.find() - 該当データあり', function() {
    const result = urlNotification.background.find('http://example.com/1');

    const expectedData = {
      message: '1',
      backgroundColor: '000000',
      fontColor: 'ffffff',
      displayPosition: 'top',
    };

    assert.strictEqual(result.matched, true);
    assert.deepStrictEqual(result.data, expectedData);
  });

});