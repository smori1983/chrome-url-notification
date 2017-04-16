var getVersion = function() {
    return localStorage.getItem("version");
};

var getPatterns = function() {
    return JSON.parse(localStorage.getItem("pattern"));
};

QUnit.module("urlNotifier.background.migrate.0to1", {
    beforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("migrate", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    urlNotifier.background.migrate();

    var patterns = getPatterns();

    var expected = [
        { url: "http://example.com/1", msg: "1", backgroundColor: "000000" }
    ];

    assert.propEqual(patterns, expected);

    var version = getVersion();

    assert.equal(version, 1);
});
