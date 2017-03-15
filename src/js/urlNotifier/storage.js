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

        deletePattern: function(pattern) {
            _deletePattern(pattern);
        },

        deleteAll: function() {
            _deleteAll();
        }
    };
})();
