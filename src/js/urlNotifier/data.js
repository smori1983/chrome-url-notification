var urlNotifier = urlNotifier || {};

urlNotifier.data = (function() {

    var _sortByUrl = function(patterns) {
        return patterns.sort(function(a, b) {
            return (a.url < b.url) ? -1 : 1;
        });
    };

    return {
        sortByUrl: function(patterns) {
            return _sortByUrl(patterns);
        },
    }
})();
