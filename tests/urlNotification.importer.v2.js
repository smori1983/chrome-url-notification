QUnit.module('urlNotification.importer.v2', {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
  },
});

QUnit.test('import v2 - case 1', function(assert) {
  var json = {
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

  var allData = urlNotification.storage.getAll();

  assert.equal(allData.length, 1);

  assert.equal(allData[0].url, 'http://example.com/1');
  assert.equal(allData[0].msg, '1');
  assert.equal(allData[0].backgroundColor, '111111');
  assert.equal(allData[0].displayPosition, 'top');
});

QUnit.test('import v2 - case 2', function(assert) {
  var json = {
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

  var allData = urlNotification.storage.getAll();

  assert.equal(allData.length, 1);

  assert.equal(allData[0].url, 'http://example.com/2');
  assert.equal(allData[0].msg, '2');
  assert.equal(allData[0].backgroundColor, '222222');
  assert.equal(allData[0].displayPosition, 'bottom');
});
