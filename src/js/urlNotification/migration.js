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
