var urlNotifier = urlNotifier || {};

urlNotifier.validator = (function() {
    var create = function() {
        return new (require("jsonschema").Validator)();
    };

    var importJsonEssential = function(json) {
        var schema = {
            "type": "object",
            "properties": {
                "version": {
                    "required": true,
                    "type": "integer",
                    "minimum": 1,
                    "maximum": urlNotifier.config.version()
                },
                "pattern": {
                    "required": true,
                    "type": "array",
                }
            }
        };

        var validator = create();

        return validator.validate(json, schema).valid;
    };

    var patternBase = function() {
        return {
            "type": "array",
            "items": { "$ref": "/item" }
         };
    };

    var patternV1 = function() {
        return {
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
    };

    var patternV2 = function() {
        return {
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
                },
                "displayPosition": {
                    "required": true,
                    "type": "string",
                    "pattern": /^(bottom|top)$/
                }
            }
        };
    };

    var patterns = {
        1: patternV1,
        2: patternV2,
    };

    var patternFor = function(version) {
        if (patterns.hasOwnProperty(version)) {
            return patterns[version]();
        }

        return {};
    };

    var importJson = function(json) {
        var validator = create();

        if (importJsonEssential(json) === false) {
            return false;
        }

        validator.addSchema(patternFor(json.version), "/item");

        return validator.validate(json.pattern, patternBase()).valid;
    };

    return {
        /**
         * @return bool
         */
        forImportJsonEssential: function(json) {
            return importJsonEssential(json);
        },
        /**
         * @return bool
         */
        forImportJson: function(json) {
            return importJson(json);
        }
    };
})();
