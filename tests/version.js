var getVersion = function() {
    return localStorage.getItem("version");
};

var getPatterns = function() {
    return JSON.parse(localStorage.getItem("pattern"));
};

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
    urlNotifier.storage.addPattern({ url: "http://example.com/1", msg: "1" });

    var data = getPatterns();

    var expected = [
        { url: "http://example.com/1", msg: "1" }
    ];

    assert.propEqual(data, expected);

    var shouldMigrate = urlNotifier.migration.shouldMigrate();

    assert.equal(shouldMigrate, true);

    urlNotifier.migration.migrateFrom(0);

    var data = getPatterns();

    var expected = [
        { url: "http://example.com/1", msg: "1", backgroundColor: "000000" }
    ];

    assert.propEqual(data, expected);

    var version = getVersion();

    assert.equal(version, 1);
});
