var urlNotifier = urlNotifier || {};

urlNotifier.migration = (function() {
    var key = {
        version: "version"
    };

    var hasVersion = function() {
        var version = localStorage.getItem(key.version);

        if (version === null) {
            return false;
        }

        return /^\d+$/.test(version);
    };

    return {
        hasVersion: function() {
            return hasVersion();
        }
    };
})();
