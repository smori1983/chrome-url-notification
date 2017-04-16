QUnit.module("urlNotifier.storage.withData", {
    beforeEach: function() {
        localStorage.clear();

        urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
        urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
        urlNotifier.storage.addPattern({ url: "http://example.com/3", msg: "3" });
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("全データ削除", function(assert) {
    urlNotifier.storage.deleteAll();

    assert.equal(0, urlNotifier.storage.getCount());
});

QUnit.test("1件削除 - 該当データ有り", function(assert) {
    urlNotifier.storage.deletePattern({ url: "http://example.com/1" });

    assert.equal(2, urlNotifier.storage.getCount());
});

QUnit.test("1件削除 - 該当データ無し", function(assert) {
    urlNotifier.storage.deletePattern({ url: "http://example.com" });

    assert.equal(3, urlNotifier.storage.getCount());
});

QUnit.test("全件取得", function(assert) {
    var all = urlNotifier.storage.getAll();

    assert.equal(3, all.length);
    assert.equal("1", all[0].msg);
    assert.equal("2", all[1].msg);
    assert.equal("3", all[2].msg);
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    assert.equal(null, urlNotifier.storage.findByUrl("http://example.com/"));
});

QUnit.test("URLで検索 該当データあり", function(assert) {
    assert.equal("2", urlNotifier.storage.findByUrl("http://example.com/2").msg);
});

QUnit.test("データ更新 - 該当データ無し", function(assert) {
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
    urlNotifier.storage.updatePattern("http://example.com/2", {
        url: "http://example.com/2",
        msg: "!"
    });

    assert.equal(3, urlNotifier.storage.getCount());
    assert.equal("1", urlNotifier.storage.findByUrl("http://example.com/1").msg);
    assert.equal("!", urlNotifier.storage.findByUrl("http://example.com/2").msg);
    assert.equal("3", urlNotifier.storage.findByUrl("http://example.com/3").msg);
});
