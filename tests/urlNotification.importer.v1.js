QUnit.module('urlNotification.importer.v1', {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
  },
});

QUnit.test('import v1 and migrate to v2', function(assert) {
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
