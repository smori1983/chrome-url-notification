var urlNotifier = urlNotifier || {};

urlNotifier.data = (function() {

    var _sortByUrl = function(patterns) {
        return patterns.sort(function(a, b) {
            return (a.url < b.url) ? -1 : 1;
        });
    };

    var _sortByMessage = function(patterns) {
        return patterns.sort(function(a, b) {
            if (a.msg === b.msg) {
                return (a.url < b.url) ? -1 : 1;
            }

            return (a.msg < b.msg) ? -1 : 1;
        });
    };

    return {
        sortByUrl: function(patterns) {
            return _sortByUrl(patterns);
        },
        sortByMessage: function(patterns) {
            return _sortByMessage(patterns);
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
        return new RegExp(convertForMaching(url));
    };

    var convertForMaching = function(url) {
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

    var _update = function(data) {
        localStorage.setItem(key.pattern, JSON.stringify(data));
    };

    var _getCount = function() {
        return _getAll().length;
    };

    var _getAll = function() {
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

    var _findByUrl = function(url) {
        var i, len, patterns = _getAll();

        for (i = 0, len = patterns.length; i < len; i++) {
            if (patterns[i].url === url) {
                return patterns[i];
            }
        }

        return null;
    };

    var _addPattern = function(pattern) {
        if (_findByUrl(pattern.url)) {
            return;
        }

        var data = _getAll();

        data.push(pattern);
        _update(data);
    };

    var _updatePattern = function(originalUrl, pattern) {
        if (_findByUrl(originalUrl) === null) {
            return;
        }

        _deletePattern({ url: originalUrl });
        _addPattern(pattern);
    };

    var _deletePattern = function(pattern) {
        if (_findByUrl(pattern.url) !== null) {
            var newData = [];

            $.each(_getAll(), function(idx, item) {
                if (item.url !== pattern.url) {
                    newData.push(item);
                }
            });

            _update(newData);
        }
    };

    var _deleteAll = function() {
        _update([]);
    };

    return {
        getCount: function() {
            return _getCount();
        },

        getAll: function() {
            return _getAll();
        },

        findByUrl: function(url) {
            return _findByUrl(url);
        },

        addPattern: function(pattern) {
            _addPattern(pattern);
        },

        updatePattern: function(url, pattern) {
            _updatePattern(url, pattern);
        },

        /**
         * pattern
         * - url
         */
        deletePattern: function(pattern) {
            _deletePattern(pattern);
        },

        deleteAll: function() {
            _deleteAll();
        }
    };
})();
