var urlNotifier = urlNotifier || {};

urlNotifier.finder = (function() {

    var _find = function(url) {
        var i, len, patterns = urlNotifier.storage.getAllPattern();

        for (i = 0, len = patterns.length; i < len; i++) {
            if (_makeRegExp(patterns[i].url).test(url)) {
                return patterns[i];
            }
        }

        return null;
    };

    var _makeRegExp = function(url) {
        return new RegExp(_convertForMaching(url));
    };

    var _convertForMaching = function(url) {
        return url.
            replace(/\/|\.|\-|\+|\?/g, function(matched) {
                return "\\" + matched;
            }).
            replace(/\*/g, function(matched) {
                return "[0-9a-zA-Z\-_]+";
            });
    };

    return {
        find: function(url) {
            return _find(url);
        }
    };
})();
