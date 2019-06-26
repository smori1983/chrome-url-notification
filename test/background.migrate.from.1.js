const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

const expectedVersion = 2;

describe('urlNotification.background.migrate.from.1', function() {
  beforeEach(function() {
    localStorage.clear();
  });

  it('no data', function() {
    urlNotification.background.migrate();

    const expected = [];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

    assert.strictEqual(urlNotification.migration.currentVersion(), expectedVersion);
  });

  it('migrate', function() {
    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1', backgroundColor: '111111' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
    urlNotification.storage.addPattern({ url: 'http://example.com/3', msg: '3' });

    urlNotification.background.migrate();

    const expected = [
      { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
      { url: 'http://example.com/3', msg: '3', backgroundColor: '000000', displayPosition: 'top' },
    ];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

    assert.strictEqual(urlNotification.migration.currentVersion(), expectedVersion);
  });
});
