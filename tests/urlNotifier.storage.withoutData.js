QUnit.module("urlNotifier.storage.withoutData", {
    beforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("全件取得 - ローカルストレージにデータなし", function(assert) {
    assert.equal(0, urlNotifier.storage.getAll().length);
});

QUnit.test("初期状態の件数", function(assert) {
    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("パターンの重複登録はできない", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(1, urlNotifier.storage.getCount());
});
