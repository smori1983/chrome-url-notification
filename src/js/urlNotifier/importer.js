var urlNotifier = urlNotifier || {};

urlNotifier.importer = (function() {
    var _ = require("lodash");

    var prepareFor1 = function(item) {
        return {
            url: item.url,
            msg: item.msg,
            backgroundColor: item.backgroundColor,
        };
    };

    var prepareFor2 = function(item) {
        return {
            url: item.url,
            msg: item.msg,
            backgroundColor: item.backgroundColor,
            displayPosition: item.displayPosition,
        };
    };

    var prepares = {
        1: prepareFor1,
        2: prepareFor2,
    };

    var migrate = function(pattern, version) {
        var result = [];

        pattern.forEach(function(item) {
            result.push(urlNotifier.migrationExecuter.from(version, item));
        });

        return result;
    };

    var addOrUpdate = function(data) {
        if (urlNotifier.storage.findByUrl(data.url)) {
            urlNotifier.storage.updatePattern(data.url, data);
        } else {
            urlNotifier.storage.addPattern(data);
        }
    };

    var importJson = function(initialJson) {
        var json = _.cloneDeep(initialJson);

        console.info("Import start.");

        while (urlNotifier.config.version() > json.version) {
            console.info("Migrate from scheme version " + json.version);

            json.pattern = migrate(json.pattern, json.version);
            json.version += 1;
        }

        json.pattern.forEach(function(item) {
            addOrUpdate(prepares[json.version](item));
        });

        console.info("Import done.");
    };

    return {
        /**
         * Assumes that json is validated.
         */
        importJson: function(json) {
            importJson(json);
        }
    }
})();
