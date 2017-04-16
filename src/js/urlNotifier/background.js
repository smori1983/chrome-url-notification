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
