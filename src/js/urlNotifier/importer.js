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

    var addOrUpdate = function(data) {
        if (urlNotifier.storage.findByUrl(data.url)) {
            urlNotifier.storage.updatePattern(data.url, data);
        } else {
            urlNotifier.storage.addPattern(data);
        }
    };

    var importJson = function(json) {
        if (prepares.hasOwnProperty(json.version)) {
            json.pattern.forEach(function(item) {
                addOrUpdate(prepares[json.version](item));
            });

            urlNotifier.background.migrate();
        }
    };

    return {
        importJson: function(json) {
            importJson(json);
        }
    }
})();
