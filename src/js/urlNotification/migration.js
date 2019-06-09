var urlNotification = urlNotification || {};

urlNotification.migration = (function() {
  /**
   * @returns {boolean}
   */
  const hasVersion = function() {
    return urlNotification.storage.hasVersion();
  };

  /**
   * @returns {number}
   */
  const currentVersion = function() {
    return urlNotification.storage.currentVersion();
  };

  /**
   * @returns {boolean}
   */
  const shouldMigrate = function() {
    return currentVersion() < urlNotification.config.version();
  };

  /**
   * @param {number} currentVersion
   */
  const migrateFrom = function(currentVersion) {
    let result = [];

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
