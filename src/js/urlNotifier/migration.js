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
        var result = [];
        var data;

        if ((data = localStorage.getItem(key.pattern)) !== null) {
            JSON.parse(data).forEach(function(item) {
                result.push(urlNotifier.migration.converter.convertFrom(currentVersion, item));
            });
        }

        localStorage.setItem(key.pattern, JSON.stringify(result));
        localStorage.setItem(key.version, currentVersion + 1);
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
