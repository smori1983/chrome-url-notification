var urlNotifier = urlNotifier || {};

urlNotifier.config = (function() {
    var version = 1;

    /**
     * used for migration from 0 to 1
     */
    var defaultBackgroundColor = "000000";

    return {
        version: function() {
            return version;
        },
        defaultBackgroundColor: function() {
            return defaultBackgroundColor;
        }
    };
})();
