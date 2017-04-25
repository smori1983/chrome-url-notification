var urlNotifier = urlNotifier || {};

urlNotifier.migration = urlNotifier.migration || {};

urlNotifier.migration.executer = (function() {
    /**
     * Migration from 0 to 1
     *
     * - set default background color
     */
    var for0 = function(item) {
        if (typeof item.backgroundColor === "undefined") {
            item.backgroundColor = urlNotifier.config.defaultBackgroundColor();
        }

        return item;
    };

    var converters = {
        0: for0
    };

    var execute = function(fromVersion, item) {
        if (converters.hasOwnProperty(fromVersion)) {
            return converters[fromVersion](item);
        }

        return item;
    };

    return {
        from: function(verstion, item) {
            return execute(verstion, item);
        }
    }
})();
