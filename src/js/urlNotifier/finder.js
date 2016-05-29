var urlNotifier = urlNotifier || {};

urlNotifier.finder = (function() {

    var _find = function(url) {
        var result = null, i, len, allPattern = urlNotifier.storage.getAllPattern();

        for (i = 0, len = allPattern.length; i < len; i++) {
            var str = _convertForMaching(allPattern[i].url);

            if (new RegExp(str).test(url)) {
                result = allPattern[i];
                break;
            }
        }

        return result;
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
