var urlNotifier = urlNotifier || {};

urlNotifier.background = (function() {
    var migrate = function() {
        while (urlNotifier.migration.shouldMigrate()) {
            urlNotifier.migration.migrateFrom(urlNotifier.migration.currentVersion());
        }
    };

    var find = function(pattern) {
        var result = {
            matched: false,
            data: null
        };

        if ((item = urlNotifier.finder.findFor(pattern)) !== null) {
            result.matched = true;
            result.data = {
                message: item.msg,
                backgroundColor: item.backgroundColor,
                fontColor: "ffffff"
            };
        }

        return result;
    };

    return {
        migrate: function() {
            migrate();
        },
        find: function(pattern) {
            return find(pattern);
        }
    };
})();

var urlNotifier = urlNotifier || {};

urlNotifier.config = (function() {
    var version = 1;

    /**
     * used for migration from 0 to 1
     */
    var defaultBackgroundColor = "000000";

    return {
        version: function() {
            return version;
        },
        defaultBackgroundColor: function() {
            return defaultBackgroundColor;
        }
    };
})();

var urlNotifier = urlNotifier || {};

urlNotifier.data = (function() {
    var sortByUrl = function(patterns) {
        return patterns.sort(function(a, b) {
            return (a.url < b.url) ? -1 : 1;
        });
    };

    var sortByMessage = function(patterns) {
        return patterns.sort(function(a, b) {
            if (a.msg === b.msg) {
                return (a.url < b.url) ? -1 : 1;
            }

            return (a.msg < b.msg) ? -1 : 1;
        });
    };

    return {
        sortByUrl: function(patterns) {
            return sortByUrl(patterns);
        },
        sortByMessage: function(patterns) {
            return sortByMessage(patterns);
        }
    }
})();

var urlNotifier = urlNotifier || {};

urlNotifier.finder = (function() {

    var find = function(url) {
        var i, len, patterns = urlNotifier.storage.getAll();

        for (i = 0, len = patterns.length; i < len; i++) {
            if (makeRegExp(patterns[i].url).test(url)) {
                return patterns[i];
            }
        }

        return null;
    };

    var makeRegExp = function(url) {
        return new RegExp(convertForMatching(url));
    };

    var convertForMatching = function(url) {
        return url.
            replace(/\/|\.|\-|\+|\?/g, function(matched) {
                return "\\" + matched;
            }).
            replace(/\*/g, function(matched) {
                return "[0-9a-zA-Z\-_]+";
            });
    };

    return {
        findFor: function(url) {
            return find(url);
        }
    };
})();

var urlNotifier = urlNotifier || {};

urlNotifier.migration = (function() {
    var key = {
        version: "version",
        pattern: "pattern"
    };

    var hasVersion = function() {
        var version = localStorage.getItem(key.version);

        if (version === null) {
            return false;
        }

        return /^\d+$/.test(version);
    };

    var currentVersion = function() {
        var version = localStorage.getItem(key.version);

        if (version === null) {
            return 0;
        }

        if (/^\d+$/.test(version)) {
            return version;
        }

        return 0;
    };

    var shouldMigrate = function() {
        return currentVersion() < urlNotifier.config.version();
    };

    var migrateFrom = function(currentVersion) {
        if (migrationFunctions.hasOwnProperty(currentVersion)) {
            migrationFunctions[currentVersion]();
        }
    };

    /**
     * Migration from 0 to 1
     *
     * - set default background color
     */
    var migrateFor0 = function() {
        var result = [];
        var data;

        if ((data = localStorage.getItem(key.pattern)) !== null) {
            JSON.parse(data).forEach(function(item) {
                if (typeof item.backgroundColor === "undefined") {
                    item.backgroundColor = urlNotifier.config.defaultBackgroundColor();
                }

                result.push(item);
            });
        }

        localStorage.setItem(key.pattern, JSON.stringify(result));
        localStorage.setItem(key.version, 1);
    };

    var migrationFunctions = {
        0: migrateFor0
    };

    return {
        hasVersion: function() {
            return hasVersion();
        },
        currentVersion: function() {
            return currentVersion();
        },
        shouldMigrate: function() {
            return shouldMigrate();
        },
        migrateFrom: function(currentVersion) {
            migrateFrom(currentVersion);
        }
    };
})();

var urlNotifier = urlNotifier || {};

urlNotifier.storage = (function() {
    var key = {
        pattern: "pattern"
    };

    var update = function(data) {
        localStorage.setItem(key.pattern, JSON.stringify(data));
    };

    var getCount = function() {
        return getAll().length;
    };

    var getAll = function() {
        var result = [], data;

        if ((data = localStorage.getItem(key.pattern)) !== null) {
            JSON.parse(data).forEach(function(item) {
                result.push(item);
            });
        }

        return result;
    };

    var findByUrl = function(url) {
        var i, len, patterns = getAll();

        for (i = 0, len = patterns.length; i < len; i++) {
            if (patterns[i].url === url) {
                return patterns[i];
            }
        }

        return null;
    };

    var addPattern = function(pattern) {
        if (findByUrl(pattern.url)) {
            return;
        }

        var data = getAll();

        data.push(pattern);
        update(data);
    };

    var updatePattern = function(originalUrl, pattern) {
        if (findByUrl(originalUrl) === null) {
            return;
        }

        deletePattern({ url: originalUrl });
        addPattern(pattern);
    };

    var deletePattern = function(pattern) {
        var newData = [];

        getAll().forEach(function(item) {
            if (item.url !== pattern.url) {
                newData.push(item);
            }
        });

        update(newData);
    };

    var deleteAll = function() {
        update([]);
    };

    return {
        getCount: function() {
            return getCount();
        },

        getAll: function() {
            return getAll();
        },

        findByUrl: function(url) {
            return findByUrl(url);
        },

        addPattern: function(pattern) {
            addPattern(pattern);
        },

        updatePattern: function(url, pattern) {
            updatePattern(url, pattern);
        },

        /**
         * pattern
         * - url
         */
        deletePattern: function(pattern) {
            deletePattern(pattern);
        },

        deleteAll: function() {
            deleteAll();
        }
    };
})();

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
                    "type": "integer",
                    "minimum": 1,
                    "maximum": urlNotifier.config.version()
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
