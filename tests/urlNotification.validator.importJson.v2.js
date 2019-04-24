QUnit.module("urlNotification.validator.importJson.v2", {
  beforeEach: function() {
    this.isValid = function(json) {
      return urlNotification.validator.forImportJson(json);
    };
  },
  afterEach: function() {
  }
});

QUnit.test("import json - error - pattern - url is not defined", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      {                 msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - url is null", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: null,      msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - url is true", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: true,      msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - url is false", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: false,     msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - url is number", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: 100,       msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - url is empty string", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "",        msg: "sample2", backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is not defined", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2",                 backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is null", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: null,      backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is true", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: true,      backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is false", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: false,     backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is number", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: 100,       backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - msg is empty string", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "",        backgroundColor: "222222" }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is not defined", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2"                            }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is null", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: null     }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is true", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: true     }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is false", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: false    }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is empty string", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: ""       }
    ]
  }));
});

QUnit.test("import json - error - pattern - backgroundColor is not hex color", function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: "12345z" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111" },
      { url: "sample2", msg: "sample2", backgroundColor: "black"  }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is not defined", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222"                         }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111"                            },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is null", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: null  }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: null     },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is bool", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: true  }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: false    },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is number", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: 123   }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: 123      },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is empty string", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: ""    }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: ""       },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - error - pattern - displayPosition is invalid string", function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "foo" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "Bottom" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "BOTTOM" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "bar"    },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "Top"    },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "TOP"    },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));
});

QUnit.test("import json - ok", function(assert) {
  assert.ok(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "top"    },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "bottom" }
    ]
  }));

  assert.ok(this.isValid({
    version: 2,
    pattern: [
      { url: "sample1", msg: "sample1", backgroundColor: "111111", displayPosition: "bottom" },
      { url: "sample2", msg: "sample2", backgroundColor: "222222", displayPosition: "top"    }
    ]
  }));
});
