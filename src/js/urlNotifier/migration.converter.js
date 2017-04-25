var urlNotifier = urlNotifier || {};

urlNotifier.migration = urlNotifier.migration || {};

urlNotifier.migration.converter = (function() {
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

    var convert = function(fromVersion, item) {
        if (converters.hasOwnProperty(fromVersion)) {
            return converters[fromVersion](item);
        }

        return item;
    };

    return {
        convertFrom: function(verstion, item) {
            return convert(verstion, item);
        }
    }
})();
