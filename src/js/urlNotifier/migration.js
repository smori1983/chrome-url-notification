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
            $.each(JSON.parse(data), function(idx, item) {
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
