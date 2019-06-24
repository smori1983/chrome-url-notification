const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.background.migrate.from.1', function() {
  beforeEach(function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1', backgroundColor: '111111' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
  });

  it('migrate', function() {
    urlNotification.background.migrate();

    const expected = [
      { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
    ];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

    assert.strictEqual(urlNotification.migration.currentVersion(), 2);
  });
});
