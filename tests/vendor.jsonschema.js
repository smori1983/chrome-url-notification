QUnit.module("vendor.jsonschema", {
    beforeEach: function() {
        var schema = {
            "type": "object",
            "properties": {
                "version": {
                    "required": true,
                    "type": "integer"
                },
                "pattern": {
                    "required": true,
                    "type": "array",
                    "items": { "$ref": "/item" }
                }
            }
        };

        var itemSchema = {
            "id": "/item",
            "properties": {
                "url": {
                    "required": true,
                    "type": "string",
                    "minLength": 1
                },
                "msg": {
                    "required": true,
                    "type": "string",
                    "minLength": 1
                },
                "backgroundColor": {
                    "required": true,
                    "type": "string",
                    "pattern": /^[0-9a-f]{6}$/i
                }
            }
        };

        this.isValid = function(json) {
            var v = new (require("jsonschema").Validator)();

            v.addSchema(itemSchema, "/item");

            return v.validate(json, schema).valid;
        };
    },
    afterEach: function() {
    }
});

QUnit.test("import json - error - array", function(assert) {
    assert.notOk(this.isValid([]));
});

QUnit.test("import json - error - no keys", function(assert) {
    assert.notOk(this.isValid({
    }));
});

QUnit.test("import json - error - version not defined", function(assert) {
    assert.notOk(this.isValid({
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - pattern not defined", function(assert) {
    assert.notOk(this.isValid({
        version: 1
    }));
});

QUnit.test("import json - error - version is null", function(assert) {
    assert.notOk(this.isValid({
        version: null,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - version is true", function(assert) {
    assert.notOk(this.isValid({
        version: true,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - version is false", function(assert) {
    assert.notOk(this.isValid({
        version: false,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - version is string of integer", function(assert) {
    assert.notOk(this.isValid({
        version: "1",
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - version is float", function(assert) {
    assert.notOk(this.isValid({
        version: 1.1,
        pattern: [
            { url: "sample1", msg: "sample1", backgroundColor: "111111" },
            { url: "sample2", msg: "sample2", backgroundColor: "222222" }
        ]
    }));
});

QUnit.test("import json - error - pattern is null", function(assert) {
    assert.notOk(this.isValid({
        version: 1,
        pattern: null
    }));
});

QUnit.test("import json - error - pattern is true", function(assert) {
    assert.notOk(this.isValid({
        version: 1,
        pattern: true
    }));
});

QUnit.test("import json - error - pattern is false", function(assert) {
    assert.notOk(this.isValid({
        version: 1,
        pattern: false
    }));
});

QUnit.test("import json - error - pattern is string", function(assert) {
    assert.notOk(this.isValid({
        version: 1,
        pattern: "hoge"
    }));
});

QUnit.test("import json - error - pattern is object", function(assert) {
    assert.notOk(this.isValid({
        version: 1,
        pattern: { url: "sample1", msg: "sample1", backgroundColor: "111111" }
    }));
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
