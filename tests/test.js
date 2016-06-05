QUnit.module("urlNotifier.storage", {
    boforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("初期状態の件数", function(assert) {
    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("全データ削除", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    urlNotifier.storage.deleteAll();

    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("1件削除", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.deletePattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(2, urlNotifier.storage.getCount());
});

QUnit.test("全件取得", function(assert) {
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
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    assert.equal(null, urlNotifier.storage.findByUrl("http://example.com/"));
});

QUnit.test("URLで検索 該当データあり", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    assert.equal("2", urlNotifier.storage.findByUrl("http://example.com/2").msg);
});

QUnit,test("パターンの重複登録はできない", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(1, urlNotifier.storage.getCount());
});



QUnit.module("urlNotifier.finder", {
    boforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "2" });

    assert.equal(null, urlNotifier.finder.find("http://example.com/"));
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    assert.equal(null, urlNotifier.finder.find("http://example.com/"));
});

QUnit.test("URLで検索 *パターンにマッチ", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "3" });

    assert.equal("3", urlNotifier.finder.find("http://example.com/3").msg);
});

QUnit.test("URLで検索 部分一致", function(assert) {
    urlNotifier.storage.addPattern({ url: "example.com", msg: "1" });

    assert.equal("1", urlNotifier.finder.find("http://example.com/").msg);
});



QUnit.module("urlNotifier.data", {
    boforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("URLソート 整数の比較", function(assert) {
    var patterns = [
        { url: "http://example.com/2", msg: "2" },
        { url: "http://example.com/1", msg: "1" },
        { url: "http://example.com/3", msg: "3" }
    ];

    var sorted = urlNotifier.data.sortByUrl(patterns);

    assert.equal(3, sorted.length);
    assert.equal(sorted[0].msg, "1");
    assert.equal(sorted[1].msg, "2");
    assert.equal(sorted[2].msg, "3");
});

QUnit.test("URLソート 整数と'*'の比較", function(assert) {
    var patterns = [
        { url: "http://example.com/2", msg: "2" },
        { url: "http://example.com/1", msg: "1" },
        { url: "http://example.com/*", msg: "*" }
    ];

    var sorted = urlNotifier.data.sortByUrl(patterns);

    assert.equal(3, sorted.length);
    assert.equal(sorted[0].msg, "*");
    assert.equal(sorted[1].msg, "1");
    assert.equal(sorted[2].msg, "2");
});

QUnit.test("メッセージソート", function(assert) {
    var patterns = [
        { url: "http://example.com/2", msg: "two" },
        { url: "http://example.com/1", msg: "three" },
        { url: "http://example.com/3", msg: "one" }
    ];

    var sorted = urlNotifier.data.sortByMessage(patterns);

    assert.equal(3, sorted.length);
    assert.equal("one", sorted[0].msg);
    assert.equal("three", sorted[1].msg);
    assert.equal("two", sorted[2].msg);
});
