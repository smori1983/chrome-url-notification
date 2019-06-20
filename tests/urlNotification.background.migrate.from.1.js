QUnit.module('urlNotification.background.migrate.from.1', {
  beforeEach: function() {
    this.urlNotification = require('url-notification');

    localStorage.clear();

    this.urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1', backgroundColor: '111111' });
    this.urlNotification.storage.addPattern({ url: 'http://example.com/2', msg: '2', backgroundColor: '222222' });
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('migrate', function(assert) {
  this.urlNotification.background.migrate();

  const expected = [
    { url: 'http://example.com/1', msg: '1', backgroundColor: '111111', displayPosition: 'top' },
    { url: 'http://example.com/2', msg: '2', backgroundColor: '222222', displayPosition: 'top' },
  ];

  assert.propEqual(this.urlNotification.storage.getAll(), expected);

  assert.strictEqual(this.urlNotification.migration.currentVersion(), 2);
});
