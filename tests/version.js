QUnit.module('urlNotification.migration', {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
    localStorage.clear();
  },
});

QUnit.test('urlNotification.migration.hasVersion - キーなし', function(assert) {
  const result = urlNotification.migration.hasVersion();

  assert.strictEqual(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 不正値 - 小数', function(assert) {
  localStorage.setItem('version', 1.1);

  const result = urlNotification.migration.hasVersion();

  assert.strictEqual(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 不正値 - 文字列', function(assert) {
  localStorage.setItem('version', 'foo');

  const result = urlNotification.migration.hasVersion();

  assert.strictEqual(result, false);
});

QUnit.test('urlNotification.migration.hasVersion - キーあり - 正常値', function(assert) {
  localStorage.setItem('version', 1);

  const result = urlNotification.migration.hasVersion();

  assert.strictEqual(result, true);
});

QUnit.test('urlNotification.migration.currentVersion - キーなし', function(assert) {
  const result = urlNotification.migration.currentVersion();

  assert.strictEqual(result, 0);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 不正値 - 小数', function(assert) {
  localStorage.setItem('version', 1.1);

  const result = urlNotification.migration.currentVersion();

  assert.strictEqual(result, 0);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 不正値 - 文字列', function(assert) {
  localStorage.setItem('version', 'foo');

  const result = urlNotification.migration.currentVersion();

  assert.strictEqual(result, 0);
});

QUnit.test('urlNotification.migration.currentVersion - キーあり - 正常値', function(assert) {
  localStorage.setItem('version', 1);

  const result = urlNotification.migration.currentVersion();

  assert.strictEqual(result, 1);
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
  const result = urlNotification.migration.currentVersion();

  assert.strictEqual(result, 0);
});

QUnit.test('urlNotification.migration - version 0 to 1', function(assert) {
  const expectedBefore = [
    { url: 'http://example.com/1', msg: '1' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expectedBefore);

  assert.strictEqual(urlNotification.migration.shouldMigrate(), true);

  urlNotification.migration.migrateFrom(0);

  const expectedAfter = [
    { url: 'http://example.com/1', msg: '1', backgroundColor: '000000' },
  ];

  assert.propEqual(urlNotification.storage.getAll(), expectedAfter);

  assert.strictEqual(urlNotification.migration.currentVersion(), 1);
});
