var urlNotifier = urlNotifier || {};

urlNotifier.storage = (function() {

    var key = {
        pattern: "pattern"
    };

    var _update = function(data) {
        localStorage.setItem(key.pattern, JSON.stringify(data));
    };

    var _getCount = function() {
        return _getAllPattern().length;
    };

    var _getAllPattern = function() {
        var result = [], data;

        if ((data = localStorage.getItem(key.pattern)) !== null) {
            $.each(JSON.parse(data), function(idx, item) {
                result.push(item);
            });
        }

        return result;
    };

    var _findByUrl = function(url) {
        var result = null;

        $.each(_getAllPattern(), function(idx, item) {
            if (item.url === url) {
                result = item;
            }
        });

        return result;
    };

    var _addPattern = function(pattern) {
        if (_findByUrl(pattern.url)) {
            return;
        }

        var data = _getAllPattern();

        data.push(pattern);
        _update(data);
    };

    var _deletePattern = function(pattern) {
        if (_findByUrl(pattern.url) !== null) {
            var newData = [];

            $.each(_getAllPattern(), function(idx, item) {
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

        getAllPattern: function() {
            return _getAllPattern();
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
