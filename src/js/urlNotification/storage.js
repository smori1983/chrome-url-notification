var urlNotification = urlNotification || {};

/**
 * @typedef {object} PatternItem
 * @property {string} url Added schema version: 0
 * @property {string} msg Added schema version: 0
 * @property {string} [backgroundColor] Added schema version: 1
 * @property {string} [displayPosition] Added schema version: 2
 */

urlNotification.storage = (function() {
  var key = {
    version: 'version',
    pattern: 'pattern',
  };

  /**
   * @returns {boolean}
   */
  var hasVersion = function() {
    var version = localStorage.getItem(key.version);

    if (version === null) {
      return false;
    }

    return /^\d+$/.test(version);
  };

  /**
   * @returns {number}
   */
  var currentVersion = function() {
    var version = localStorage.getItem(key.version);

    if (version === null) {
      return 0;
    }

    if (/^\d+$/.test(version)) {
      return parseInt(version, 10);
    }

    return 0;
  };

  /**
   * @param {number} version
   */
  var updateVersion = function(version) {
    localStorage.setItem(key.version, version);
  };

  /**
   * @param {PatternItem[]} data
   */
  var update = function(data) {
    localStorage.setItem(key.pattern, JSON.stringify(data));
  };

  /**
   * @returns {number}
   */
  var getCount = function() {
    return getAll().length;
  };

  /**
   * @returns {PatternItem[]}
   */
  var getAll = function() {
    var data = localStorage.getItem(key.pattern);

    if (data === null) {
      return [];
    }

    return JSON.parse(data);
  };

  /**
   * @param {string} url
   * @returns {(PatternItem|null)}
   */
  var findByUrl = function(url) {
    var i, len, patterns = getAll();

    for (i = 0, len = patterns.length; i < len; i++) {
      if (patterns[i].url === url) {
        return patterns[i];
      }
    }

    return null;
  };

  /**
   * @param {PatternItem} pattern
   */
  var addPattern = function(pattern) {
    if (findByUrl(pattern.url)) {
      return;
    }

    var data = getAll();

    data.push(pattern);
    update(data);
  };

  /**
   * @param {string} originalUrl
   * @param {PatternItem} pattern
   */
  var updatePattern = function(originalUrl, pattern) {
    if (findByUrl(originalUrl)) {
      deletePattern(originalUrl);
      addPattern(pattern);
    }
  };

  /**
   * @param {string} url
   */
  var deletePattern = function(url) {
    var newData = [];

    getAll().forEach(function(item) {
      if (item.url !== url) {
        newData.push(item);
      }
    });

    update(newData);
  };

  var deleteAll = function() {
    update([]);
  };

  return {
    hasVersion: hasVersion,
    currentVersion: currentVersion,
    getCount: getCount,
    getAll: getAll,
    findByUrl: findByUrl,
    addPattern: addPattern,
    updatePattern: updatePattern,
    deletePattern: deletePattern,
    deleteAll: deleteAll,
    replace: function(version, pattern) {
      updateVersion(version);
      update(pattern);
    },
  };
})();
