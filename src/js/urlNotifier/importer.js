var urlNotifier = urlNotifier || {};

urlNotifier.importer = (function() {
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

    var importJson = function(json) {
        var version = json.version;
        var pattern = json.pattern;

        console.info("Import start.");

        while (urlNotifier.config.version() > version) {
            console.info("Migrate from scheme version " + version);

            pattern = migrate(pattern, version);
            version += 1;
        }

        pattern.forEach(function(item) {
            addOrUpdate(prepares[version](item));
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
