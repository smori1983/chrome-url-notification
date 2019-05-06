var urlNotification = urlNotification || {};

urlNotification.migration = (function() {
  /**
   * @returns {boolean}
   */
  var hasVersion = function() {
    return urlNotification.storage.hasVersion();
  };

  /**
   * @returns {number}
   */
  var currentVersion = function() {
    return urlNotification.storage.currentVersion();
  };

  /**
   * @returns {boolean}
   */
  var shouldMigrate = function() {
    return currentVersion() < urlNotification.config.version();
  };

  /**
   * @param {number} currentVersion
   */
  var migrateFrom = function(currentVersion) {
    var result = [];

    urlNotification.storage.getAll().forEach(function(item) {
      result.push(urlNotification.migrationExecuter.from(currentVersion, item));
    });

    urlNotification.storage.replace(currentVersion + 1, result);
  };

  return {
    hasVersion: hasVersion,
    currentVersion: currentVersion,
    shouldMigrate: shouldMigrate,
    migrateFrom: migrateFrom,
  };
})();
