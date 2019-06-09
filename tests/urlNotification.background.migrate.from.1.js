QUnit.module('urlNotification.background.migrate.from.1', {
  beforeEach: function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1', backgroundColor: '111111' });
    urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('migrate', function(assert) {
  urlNotification.background.migrate();

  const expected = [
    { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top' },
    { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expected);

  assert.strictEqual(urlNotification.migration.currentVersion(), 2);
});
