QUnit.module("urlNotifier.background.migrate.from.0", {
    beforeEach: function() {
        localStorage.clear();

        urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
        urlNotifier.storage.addPattern({ url: "http://example.com/2", msg: "2", backgroundColor: "222222" });
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("migrate", function(assert) {
    urlNotifier.background.migrate();

    var expected = [
        { url: "http://example.com/1", msg: "1", backgroundColor: "000000", displayPosition: "top" },
        { url: "http://example.com/2", msg: "2", backgroundColor: "222222", displayPosition: "top" }
    ];

    assert.propEqual(urlNotifier.storage.getAll(), expected);

    assert.equal(urlNotifier.migration.currentVersion(), 2);
});
