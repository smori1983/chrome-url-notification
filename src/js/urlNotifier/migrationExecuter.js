var urlNotifier = urlNotifier || {};

urlNotifier.migrationExecuter = (function() {
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

    /**
     * Migration from 1 to 2
     *
     * - set default display position
     */
    var for1 = function(item) {
        if (typeof item.displayPosition === "undefined") {
            item.displayPosition = urlNotifier.config.defaultDisplayPosition();
        }

        return item;
    };

    var converters = {
        0: for0,
        1: for1,
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
