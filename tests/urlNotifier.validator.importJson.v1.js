QUnit.module("urlNotifier.validator.importJson.v1", {
    beforeEach: function() {
        this.isValid = function(json) {
            return urlNotifier.validator.forImportJson(json);
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
            { url: "sample2", msg: "sample2", backgroundColor: "12345z" }
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

QUnit.test("import json - ok", function(assert) {
    assert.ok(this.isValid({
        version: 1,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "000000" }
        ]
    }));

    assert.ok(this.isValid({
        version: 1,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "ffffff" }
        ]
    }));
});
