var urlNotifier = urlNotifier || {};

urlNotifier.migration = (function() {
    var hasVersion = function() {
        return urlNotifier.storage.hasVersion();
    };

    var currentVersion = function() {
        return urlNotifier.storage.currentVersion();
    };

    var shouldMigrate = function() {
        return currentVersion() < urlNotifier.config.version();
    };

    var migrateFrom = function(currentVersion) {
        var result = [];

        urlNotifier.storage.getAll().forEach(function(item) {
            result.push(urlNotifier.migrationExecuter.from(currentVersion, item));
        });

        urlNotifier.storage.replace(currentVersion + 1, result);
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
