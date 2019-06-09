QUnit.module('urlNotification.background', {
  beforeEach: function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2' });
    urlNotification.storage.addPattern({ url: 'http://example.com/3', msg: '3' });

    urlNotification.background.migrate();
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('background.find() - 該当データなし', function(assert) {
  const result = urlNotification.background.find('foo');

  assert.strictEqual(result.matched, false);
  assert.strictEqual(result.data, null);
});

QUnit.test('background.find() - 該当データあり', function(assert) {
  const result = urlNotification.background.find('http://example.com/1');

  const expectedData = {
    message: '1',
    backgroundColor: '000000',
    fontColor: 'ffffff',
    displayPosition: 'top',
  };

  assert.strictEqual(result.matched, true);
  assert.propEqual(result.data, expectedData);
});


