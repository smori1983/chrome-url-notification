QUnit.module("urlNotifier.finder", {
    beforeEach: function() {
        localStorage.clear();

        urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
        urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
        urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "*" });

        urlNotifier.storage.addPattern({ url: "http://abc-123.net/1", msg: "abc-123-1" });
        urlNotifier.storage.addPattern({ url: "http://abc-123.net/*", msg: "abc-123-0" });

        urlNotifier.storage.addPattern({ url: "http://*.example.com/", msg: "subdomain-1" });

        urlNotifier.background.migrate();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("URLで検索 該当データなし", function(assert) {
    var result = urlNotifier.finder.findFor("http://example.com/");

    assert.equal(result, null);
});

QUnit.test("URLで検索 *パターンにマッチ", function(assert) {
    var result = urlNotifier.finder.findFor("http://example.com/3");

    var expected = {
        url: "http://example.com/*",
        msg: "*",
        backgroundColor: "000000",
        displayPosition: "top",
    };

    assert.propEqual(result, expected);
});

QUnit.test("URLで検索 部分一致", function(assert) {
    var result = urlNotifier.finder.findFor("http://example.com/1/1.html");

    var expected = {
        url: "http://example.com/1",
        msg: "1",
        backgroundColor: "000000",
        displayPosition: "top",
    };

    assert.propEqual(result, expected);
});

QUnit.test("URLで検索 エスケープ処理 : -", function(assert) {
    var result = urlNotifier.finder.findFor("http://abc-123.net/1.html");

    assert.propEqual(result.msg, 'abc-123-1');
});

QUnit.test("URLで検索 *パターンエスケープ処理 : -", function(assert) {
    var result = urlNotifier.finder.findFor("http://a-b-c.example.com/");

    assert.propEqual(result.msg, 'subdomain-1');
});
