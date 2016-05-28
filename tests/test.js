var setUp = function() {
    urlNotifier.storage.deleteAll();
};

QUnit.module("urlNotifier.storage");

QUnit.test("delete all patterns", function(assert) {
    urlNotifier.storage.addPattern({ url: "http://example.com/", msg: "example.com" });

    urlNotifier.storage.deleteAll();

    assert.equal(0, urlNotifier.storage.getCount());
});
