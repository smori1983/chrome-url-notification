QUnit.module("urlNotifier.finder", {
    beforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "2" });

    assert.equal(null, urlNotifier.finder.findFor("http://example.com/"));
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });

    assert.equal(null, urlNotifier.finder.findFor("http://example.com/"));
});

QUnit.test("URLで検索 *パターンにマッチ", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
    urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "3" });

    assert.equal("3", urlNotifier.finder.findFor("http://example.com/3").msg);
});

QUnit.test("URLで検索 部分一致", function(assert) {
    urlNotifier.storage.addPattern({ url: "example.com", msg: "1" });

    assert.equal("1", urlNotifier.finder.findFor("http://example.com/").msg);
});


