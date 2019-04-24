QUnit.module("urlNotification.storage.withoutData", {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
    localStorage.clear();
  }
});

QUnit.test("全件取得 - ローカルストレージにデータなし", function(assert) {
  assert.equal(0, urlNotification.storage.getAll().length);
});

QUnit.test("初期状態の件数", function(assert) {
  assert.equal(0, urlNotification.storage.getCount());
});

QUnit.test("パターンの重複登録はできない", function(assert) {
  urlNotification.storage.addPattern({ url: "http://example.com/1", msg: "1" });
  urlNotification.storage.addPattern({ url: "http://example.com/1", msg: "1" });
  urlNotification.storage.addPattern({ url: "http://example.com/1", msg: "1" });

  assert.equal(1, urlNotification.storage.getCount());
});
