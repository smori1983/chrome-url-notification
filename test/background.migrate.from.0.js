const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('background.migrate.from.0', function () {
  beforeEach(function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
  });

  it('migrate', function() {
    urlNotification.background.migrate();

    const expected = [
      { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top' },
      { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
    ];

    assert.deepStrictEqual(urlNotification.storage.getAll(), expected);

    assert.strictEqual(urlNotification.migration.currentVersion(), 2);
  });
});
