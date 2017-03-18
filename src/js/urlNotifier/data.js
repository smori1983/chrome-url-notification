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
