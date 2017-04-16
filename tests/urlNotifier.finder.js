QUnit.module("urlNotifier.finder", {
    beforeEach: function() {
        localStorage.clear();

        urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
        urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2" });
        urlNotifier.storage.addPattern({ url: "http://example.com/*", msg: "*" });

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
        backgroundColor: "000000"
    };

    assert.propEqual(result, expected);
});

QUnit.test("URLで検索 部分一致", function(assert) {
    var result = urlNotifier.finder.findFor("http://example.com/1/1.html");

    var expected = {
        url: "http://example.com/1",
        msg: "1",
        backgroundColor: "000000"
    };

    assert.propEqual(result, expected);
});


