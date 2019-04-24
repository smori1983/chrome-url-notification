QUnit.module("urlNotification.data", {
  beforeEach: function() {
    localStorage.clear();
  },
  afterEach: function() {
    localStorage.clear();
  }
});

QUnit.test("URLソート 整数の比較", function(assert) {
  var patterns = [
    { url: "http://example.com/2", msg: "2" },
    { url: "http://example.com/1", msg: "1" },
    { url: "http://example.com/3", msg: "3" }
  ];

  var sorted = urlNotification.data.sortByUrl(patterns);

  assert.equal(3, sorted.length);
  assert.equal(sorted[0].msg, "1");
  assert.equal(sorted[1].msg, "2");
  assert.equal(sorted[2].msg, "3");
});

QUnit.test("URLソート 整数と'*'の比較", function(assert) {
  var patterns = [
    { url: "http://example.com/2", msg: "2" },
    { url: "http://example.com/1", msg: "1" },
    { url: "http://example.com/*", msg: "*" }
  ];

  var sorted = urlNotification.data.sortByUrl(patterns);

  assert.equal(3, sorted.length);
  assert.equal(sorted[0].msg, "*");
  assert.equal(sorted[1].msg, "1");
  assert.equal(sorted[2].msg, "2");
});

QUnit.test("メッセージソート", function(assert) {
  var patterns = [
    { url: "http://example.com/2", msg: "two" },
    { url: "http://example.com/1", msg: "three" },
    { url: "http://example.com/3", msg: "one" }
  ];

  var sorted = urlNotification.data.sortByMessage(patterns);

  assert.equal(3, sorted.length);
  assert.equal("one", sorted[0].msg);
  assert.equal("three", sorted[1].msg);
  assert.equal("two", sorted[2].msg);
});
