QUnit.module('urlNotification.importer.v2', {
  beforeEach: function() {
    this.urlNotification = require('url-notification');

    localStorage.clear();
  },
  afterEach: function() {
  },
});

QUnit.test('import v2 - case 1', function(assert) {
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

  this.urlNotification.importer.importJson(json);

  const allData = this.urlNotification.storage.getAll();

  assert.strictEqual(allData.length, 1);

  assert.strictEqual(allData[0].url, 'http://example.com/1');
  assert.strictEqual(allData[0].msg, '1');
  assert.strictEqual(allData[0].backgroundColor, '111111');
  assert.strictEqual(allData[0].displayPosition, 'top');
});

QUnit.test('import v2 - case 2', function(assert) {
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

  this.urlNotification.importer.importJson(json);

  const allData = this.urlNotification.storage.getAll();

  assert.strictEqual(allData.length, 1);

  assert.strictEqual(allData[0].url, 'http://example.com/2');
  assert.strictEqual(allData[0].msg, '2');
  assert.strictEqual(allData[0].backgroundColor, '222222');
  assert.strictEqual(allData[0].displayPosition, 'bottom');
});
