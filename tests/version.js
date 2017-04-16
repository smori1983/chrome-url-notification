QUnit.module("urlNotifier.migration", {
    beforeEach: function() {
        localStorage.clear();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("urlNotifier.migration.hasVersion - キーなし", function(assert) {
    var result = urlNotifier.migration.hasVersion();

    assert.equal(result, false);
});

QUnit.test("urlNotifier.migration.hasVersion - キーあり - 不正値", function(assert) {
    localStorage.setItem("version", 1.1);

    var result = urlNotifier.migration.hasVersion();

    assert.equal(result, false);
});

QUnit.test("urlNotifier.migration.hasVersion - キーあり - 正常値", function(assert) {
    localStorage.setItem("version", 1);

    var result = urlNotifier.migration.hasVersion();

    assert.equal(result, true);
});


QUnit.module("urlNotifier.migration.0to1", {
    beforeEach: function() {
        localStorage.clear();

        urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("urlNotifier.migration - version 0", function(assert) {
    var result = urlNotifier.migration.currentVersion();

    assert.equal(result, 0);
});

QUnit.test("urlNotifier.migration - version 0 to 1", function(assert) {
    var expected = [
        { url: "http://example.com/1", msg: "1" }
    ];

    assert.propEqual(urlNotifier.storage.getAll(), expected);

    assert.equal(urlNotifier.migration.shouldMigrate(), true);

    urlNotifier.migration.migrateFrom(0);

    var expected = [
        { url: "http://example.com/1", msg: "1", backgroundColor: "000000" }
    ];

    assert.propEqual(urlNotifier.storage.getAll(), expected);

    assert.equal(urlNotifier.migration.currentVersion(), 1);
});
