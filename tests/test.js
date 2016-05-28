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

QUnit.test("全件取得", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    var all = urlNotifier.storage.getAllPattern();

    assert.equal(3, all.length);
    assert.equal("1", all[0].msg);
    assert.equal("2", all[1].msg);
    assert.equal("3", all[2].msg);
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "example.com" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "example.com" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "example.com" });

    var found = urlNotifier.storage.findByUrl("http://example.com/");

    assert.equal(null, found);
});

QUnit.test("URLで検索 該当データあり", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    var found = urlNotifier.storage.findByUrl("http://example.com/2");

    assert.equal("2", found.msg);
});
