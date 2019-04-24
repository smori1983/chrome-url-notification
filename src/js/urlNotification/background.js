var urlNotification = urlNotification || {};

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FindResultData|null)} data Depends on the value of matched
 */

/**
 * @typedef {object} FindResultData
 * @property {string} message
 * @property {string} backgroundColor
 * @property {string} fontColor
 * @property {string} displayPosition
 */

urlNotification.background = (function() {
  var migrate = function() {
    while (urlNotification.migration.shouldMigrate()) {
      urlNotification.migration.migrateFrom(urlNotification.migration.currentVersion());
    }
  };

  /**
   * @param {string} pattern
   * @return {FindResult}
   */
  var find = function(pattern) {
    var item;
    var result = {};

    if ((item = urlNotification.finder.findFor(pattern)) !== null) {
      result.matched = true;
      result.data = {
        message: item.msg,
        backgroundColor: item.backgroundColor,
        fontColor: 'ffffff',
        displayPosition: item.displayPosition,
      };
    } else {
      result.matched = false;
      result.data = null;
    }

    return result;
  };

  return {
    migrate: migrate,
    find: find,
  };
})();
