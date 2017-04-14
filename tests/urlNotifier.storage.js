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

QUnit.test("1件削除 - 該当データ有り", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.deletePattern({ url: "http://example.com/1" });

    assert.equal(2, urlNotifier.storage.getCount());
});

QUnit.test("1件削除 - 該当データ無し", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.deletePattern({ url: "http://example.com" });

    assert.equal(3, urlNotifier.storage.getCount());
});

QUnit.test("全件取得 - ローカルストレージにデータなし", function(assert) {
    assert.equal(0, urlNotifier.storage.getAll().length);
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

QUnit.test("パターンの重複登録はできない", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    assert.equal(1, urlNotifier.storage.getCount());
});

QUnit.test("データ更新 - 該当データ無し", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.updatePattern("http://example.com", {
        url: "http://example.com",
        msg: "!"
    });

    assert.equal(3, urlNotifier.storage.getCount());
    assert.equal("1", urlNotifier.storage.findByUrl("http://example.com/1").msg);
    assert.equal("2", urlNotifier.storage.findByUrl("http://example.com/2").msg);
    assert.equal("3", urlNotifier.storage.findByUrl("http://example.com/3").msg);
});

QUnit.test("データ更新 - 該当データ有り", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });

    urlNotifier.storage.updatePattern("http://example.com/2", {
        url: "http://example.com/2",
        msg: "!"
    });

    assert.equal(3, urlNotifier.storage.getCount());
    assert.equal("1", urlNotifier.storage.findByUrl("http://example.com/1").msg);
    assert.equal("!", urlNotifier.storage.findByUrl("http://example.com/2").msg);
    assert.equal("3", urlNotifier.storage.findByUrl("http://example.com/3").msg);
});

