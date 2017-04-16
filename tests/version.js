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
