var urlNotifier = urlNotifier || {};

urlNotifier.background = (function() {
    var find = function(pattern) {
        var result = {
            matched: false,
            data: null
        };

        if ((item = urlNotifier.finder.findFor(pattern)) !== null) {
            result.matched = true;
            result.data = {
                message: item.msg,
                backgroundColor: item.backgroundColor,
                fontColor: "ffffff"
            };
        }

        return result;
    };

    return {
        find: function(pattern) {
            return find(pattern);
        }
    };
})();
