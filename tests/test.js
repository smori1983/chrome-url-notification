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

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    urlNotifier.storage.deleteAll();

    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("1件削除", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.deletePattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(2, urlNotifier.storage.getCount());
});

QUnit.test("全件取得", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    var all = urlNotifier.storage.getAll();

    assert.equal(3, all.length);
    assert.equal("1", all[0].msg);
    assert.equal("2", all[1].msg);
    assert.equal("3", all[2].msg);
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

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

QUnit,test("パターンの重複登録はできない", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(1, urlNotifier.storage.getCount());
});



QUnit.module("urlNotifier.finder");

QUnit.test("URLで検索 該当データなし", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    var result = urlNotifier.finder.find("http://example.com/");

    assert.equal(null, result);
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    var result = urlNotifier.finder.find("http://example.com/");

    assert.equal(null, result);
});

QUnit.test("URLで検索 *パターンにマッチ", function(assert) {
    setUp();

    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "3" });

    var result = urlNotifier.finder.find("http://example.com/3");

    assert.equal(result.msg, "3");
});
