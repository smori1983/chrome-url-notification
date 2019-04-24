var urlNotification = urlNotification || {};

urlNotification.importer = (function() {
  var _ = require('lodash');

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
      result.push(urlNotification.migrationExecuter.from(version, item));
    });

    return result;
  };

  var addOrUpdate = function(data) {
    if (urlNotification.storage.findByUrl(data.url)) {
      urlNotification.storage.updatePattern(data.url, data);
    } else {
      urlNotification.storage.addPattern(data);
    }
  };

  var importJson = function(initialJson) {
    var json = _.cloneDeep(initialJson);

    console.info('Import start.');

    while (urlNotification.config.version() > json.version) {
      console.info('Migrate from scheme version ' + json.version);

      json.pattern = migrate(json.pattern, json.version);
      json.version += 1;
    }

    json.pattern.forEach(function(item) {
      addOrUpdate(prepares[json.version](item));
    });

    console.info('Import done.');
  };

  return {
    importJson: importJson,
  };
})();
