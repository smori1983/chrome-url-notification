QUnit.module('urlNotification.migration', {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('urlNotification.migration.hasVersion - キーなし', function(assert) {
  var result = urlNotification.migration.hasVersion();

  assert.equal(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 不正値 - 小数', function(assert) {
  localStorage.setItem('version', 1.1);

  var result = urlNotification.migration.hasVersion();

  assert.equal(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 不正値 - 文字列', function(assert) {
  localStorage.setItem('version', 'foo');

  var result = urlNotification.migration.hasVersion();

  assert.equal(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 正常値', function(assert) {
  localStorage.setItem('version', 1);

  var result = urlNotification.migration.hasVersion();

  assert.equal(result, true);
});

QUnit.test('urlNotification.migration.currentVersion - キーなし', function(assert) {
  var result = urlNotification.migration.currentVersion();

  assert.strictEqual(0, result);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 不正値 - 小数', function(assert) {
  localStorage.setItem('version', 1.1);

  var result = urlNotification.migration.currentVersion();

  assert.strictEqual(0, result);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 不正値 - 文字列', function(assert) {
  localStorage.setItem('version', 'foo');

  var result = urlNotification.migration.currentVersion();

  assert.strictEqual(0, result);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 正常値', function(assert) {
  localStorage.setItem('version', 1);

  var result = urlNotification.migration.currentVersion();

  assert.strictEqual(1, result);
});


QUnit.module('urlNotification.migration.0to1', {
  beforeEach: function() {
    localStorage.clear();

    urlNotification.storage.addPattern({ url: 'http://example.com/1', msg: '1' });
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('urlNotification.migration - version 0', function(assert) {
  var result = urlNotification.migration.currentVersion();

  assert.equal(result, 0);
});

QUnit.test('urlNotification.migration - version 0 to 1', function(assert) {
  var expectedBefore = [
    { url: 'http://example.com/1', msg: '1' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expectedBefore);

  assert.equal(urlNotification.migration.shouldMigrate(), true);

  urlNotification.migration.migrateFrom(0);

  var expectedAfter = [
    { url: 'http://example.com/1', msg: '1', backgroundColor: '000000' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expectedAfter);

  assert.equal(urlNotification.migration.currentVersion(), 1);
});
