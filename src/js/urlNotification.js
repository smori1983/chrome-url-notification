var urlNotification = urlNotification || {};

urlNotification.background = (function() {
    var migrate = function() {
        while (urlNotification.migration.shouldMigrate()) {
            urlNotification.migration.migrateFrom(urlNotification.migration.currentVersion());
        }
    };

    var find = function(pattern) {
        var item;
        var result = {
            matched: false,
            data: null
        };

        if ((item = urlNotification.finder.findFor(pattern)) !== null) {
            result.matched = true;
            result.data = {
                message: item.msg,
                backgroundColor: item.backgroundColor,
                fontColor: "ffffff",
                displayPosition: item.displayPosition,
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

var urlNotification = urlNotification || {};

urlNotification.config = (function() {
    var version = 2;

    /**
     * used for migration from 0 to 1
     */
    var defaultBackgroundColor = "000000";

    /**
     * used for migration from 1 to 2
     */
    var defaultDisplayPosition = "top";

    return {
        version: function() {
            return version;
        },
        defaultBackgroundColor: function() {
            return defaultBackgroundColor;
        },
        defaultDisplayPosition: function() {
            return defaultDisplayPosition;
        }
    };
})();

var urlNotification = urlNotification || {};

urlNotification.data = (function() {
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

var urlNotification = urlNotification || {};

urlNotification.finder = (function() {

    var find = function(url) {
        var i, len, patterns = urlNotification.storage.getAll();

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
            replace(/\/|\.|-|\+|\?/g, function(matched) {
                return "\\" + matched;
            }).
            replace(/\*/g, function() {
                return "[0-9a-zA-Z-_]+";
            });
    };

    return {
        findFor: function(url) {
            return find(url);
        }
    };
})();

var urlNotification = urlNotification || {};

urlNotification.importer = (function() {
    var _ = require("lodash");

    var prepareFor1 = function(item) {
        return {
            url: item.url,
            msg: item.msg,
            backgroundColor: item.backgroundColor,
        };
    };

    var prepareFor2 = function(item) {
        return {
            url: item.url,
            msg: item.msg,
            backgroundColor: item.backgroundColor,
            displayPosition: item.displayPosition,
        };
    };

    var prepares = {
        1: prepareFor1,
        2: prepareFor2,
    };

    var migrate = function(pattern, version) {
        var result = [];

        pattern.forEach(function(item) {
            result.push(urlNotification.migrationExecuter.from(version, item));
        });

        return result;
    };

    var addOrUpdate = function(data) {
        if (urlNotification.storage.findByUrl(data.url)) {
            urlNotification.storage.updatePattern(data.url, data);
        } else {
            urlNotification.storage.addPattern(data);
        }
    };

    var importJson = function(initialJson) {
        var json = _.cloneDeep(initialJson);

        console.info("Import start.");

        while (urlNotification.config.version() > json.version) {
            console.info("Migrate from scheme version " + json.version);

            json.pattern = migrate(json.pattern, json.version);
            json.version += 1;
        }

        json.pattern.forEach(function(item) {
            addOrUpdate(prepares[json.version](item));
        });

        console.info("Import done.");
    };

    return {
        /**
         * Assumes that json is validated.
         */
        importJson: function(json) {
            importJson(json);
        }
    }
})();

var urlNotification = urlNotification || {};

urlNotification.migration = (function() {
    var hasVersion = function() {
        return urlNotification.storage.hasVersion();
    };

    var currentVersion = function() {
        return urlNotification.storage.currentVersion();
    };

    var shouldMigrate = function() {
        return currentVersion() < urlNotification.config.version();
    };

    var migrateFrom = function(currentVersion) {
        var result = [];

        urlNotification.storage.getAll().forEach(function(item) {
            result.push(urlNotification.migrationExecuter.from(currentVersion, item));
        });

        urlNotification.storage.replace(currentVersion + 1, result);
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

var urlNotification = urlNotification || {};

urlNotification.migrationExecuter = (function() {
    /**
     * Migration from 0 to 1
     *
     * - set default background color
     */
    var for0 = function(item) {
        if (typeof item.backgroundColor === "undefined") {
            item.backgroundColor = urlNotification.config.defaultBackgroundColor();
        }

        return item;
    };

    /**
     * Migration from 1 to 2
     *
     * - set default display position
     */
    var for1 = function(item) {
        if (typeof item.displayPosition === "undefined") {
            item.displayPosition = urlNotification.config.defaultDisplayPosition();
        }

        return item;
    };

    var converters = {
        0: for0,
        1: for1,
    };

    var execute = function(fromVersion, item) {
        if (converters.hasOwnProperty(fromVersion)) {
            return converters[fromVersion](item);
        }

        return item;
    };

    return {
        from: function(verstion, item) {
            return execute(verstion, item);
        }
    }
})();

var urlNotification = urlNotification || {};

urlNotification.storage = (function() {
    var key = {
        version: "version",
        pattern: "pattern",
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
            return parseInt(version, 10);
        }

        return 0;
    };

    var updateVersion = function(version) {
        localStorage.setItem(key.version, version);
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
        hasVersion: function() {
            return hasVersion();
        },
        currentVersion: function() {
            return currentVersion();
        },

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
        },

        replace: function(version, pattern) {
            updateVersion(version);
            update(pattern);
        }
    };
})();

var urlNotification = urlNotification || {};

urlNotification.validator = (function() {
    var extend = require("extend");

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
                    "maximum": urlNotification.config.version()
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
            "items": { "$ref": "/item" },
        };
    };

    var patternTemplate = function() {
        return {
            "id": "/item",
            "properties": {},
        };
    };

    var patternV1 = function() {
        return extend(patternTemplate(), {
            "properties": {
                "url": {
                    "required": true,
                    "type": "string",
                    "minLength": 1,
                },
                "msg": {
                    "required": true,
                    "type": "string",
                    "minLength": 1,
                },
                "backgroundColor": {
                    "required": true,
                    "type": "string",
                    "pattern": /^[0-9a-f]{6}$/i,
                },
            },
        });
    };

    var patternV2 = function() {
        return extend(patternV1(), {
            "properties": {
                "displayPosition": {
                    "required": true,
                    "type": "string",
                    "pattern": /^(bottom|top)$/,
                },
            },
        });
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
