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

urlNotifier.storage = (function() {

    var defaultBackgroundColor = "000000";

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
            $.each(JSON.parse(data), function(idx, item) {
                if (typeof item.backgroundColor === "undefined") {
                    item.backgroundColor = defaultBackgroundColor;
                }

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

        $.each(getAll(), function(idx, item) {
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
