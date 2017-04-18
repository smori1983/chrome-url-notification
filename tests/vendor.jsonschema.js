QUnit.module("vendor.jsonschema", {
    beforeEach: function() {
        localStorage.clear();

        var Validator = require("jsonschema").Validator;

        this.validator = new Validator();
    },
    afterEach: function() {
        localStorage.clear();
    }
});

QUnit.test("simple example", function(assert) {
    var instance = 1;
    var schema = { "type": "number" };

    var result = this.validator.validate(instance, schema);

    assert.equal(result.valid, true);
});
