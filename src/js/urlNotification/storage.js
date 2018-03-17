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
