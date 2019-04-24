QUnit.module('urlNotification.background.migrate.from.0', {
  beforeEach: function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('migrate', function(assert) {
  urlNotification.background.migrate();

  var expected = [
    { url: 'http://example.com/1', msg: '1', backgroundColor: '000000', displayPosition: 'top' },
    { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expected);

  assert.equal(urlNotification.migration.currentVersion(), 2);
});
