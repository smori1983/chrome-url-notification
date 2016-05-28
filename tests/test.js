var setUp = function() {
    urlNotifier.storage.deleteAll();
};

QUnit.module("urlNotifier.storage");

QUnit.test("初期状態の件数", function(assert) {
    setUp();

    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("全データ削除", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "example.com" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "example.com" });

    urlNotifier.storage.deleteAll();

    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("1件削除", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "example.com" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "example.com" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "example.com" });

    urlNotifier.storage.deletePattern({ url: "http://example.com/1", msg: "example.com" });

    assert.equal(2, urlNotifier.storage.getCount());
});
