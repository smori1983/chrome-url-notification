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
  const migrate = function() {
    while (urlNotification.migration.shouldMigrate()) {
      urlNotification.migration.migrateFrom(urlNotification.migration.currentVersion());
    }
  };

  /**
   * @param {string} pattern
   * @return {FindResult}
   */
  const find = function(pattern) {
    let item;
    let result = {};

    if ((item = urlNotification.finder.findFor(pattern)) !== null) {
      result.matched = true;
      result.data = createData(item);
    } else {
      result.matched = false;
      result.data = null;
    }

    return result;
  };

  /**
   * @param {PatternItem} item
   * @returns {FindResultData}
   */
  const createData = function(item) {
    return {
      message: item.msg,
      backgroundColor: item.backgroundColor,
      fontColor: 'ffffff',
      displayPosition: item.displayPosition,
    };
  };

  return {
    migrate: migrate,
    find: find,
  };
})();
