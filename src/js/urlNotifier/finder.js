var urlNotifier = urlNotifier || {};

urlNotifier.finder = (function() {

    var _find = function(url) {
        var i, len, patterns = urlNotifier.storage.getAllPattern();

        for (i = 0, len = patterns.length; i < len; i++) {
            var str = _convertForMaching(patterns[i].url);

            if (new RegExp(str).test(url)) {
                return patterns[i];
            }
        }

        return null;
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
