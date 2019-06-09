var urlNotification = urlNotification || {};

urlNotification.finder = (function() {
  /**
   * @param {string} url
   * @returns {(PatternItem|null)}
   */
  var find = function(url) {
    var i, len, patterns = urlNotification.storage.getAll();

    for (i = 0, len = patterns.length; i < len; i++) {
      if (makeRegExp(patterns[i].url).test(url)) {
        return patterns[i];
      }
    }

    return null;
  };

  var makeRegExp = function(url) {
    return new RegExp(convertForMatching(url));
  };

  var convertForMatching = function(url) {
    return url.
      replace(/[/.+\-?]/g, function(matched) {
        return '\\' + matched;
      }).
      replace(/\*/g, function() {
        return '[0-9a-zA-Z-_]+';
      });
  };

  return {
    findFor: find,
  };
})();
