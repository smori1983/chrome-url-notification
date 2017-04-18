var urlNotifier = urlNotifier || {};

urlNotifier.validator = (function() {
    var create = function() {
        return new (require("jsonschema").Validator)();
    };

    var importJson = function(json) {
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

        var validator = create();

        validator.addSchema(itemSchema, "/item");

        return validator.validate(json, schema).valid;
    };

    return {
        /**
         * @return bool
         */
        forImportJson: function(json) {
            return importJson(json);
        }
    };
})();
