var urlNotification = urlNotification || {};

urlNotification.data = (function() {
  /**
   * @param {PatternItem[]} patterns
   * @returns {PatternItem[]}
   */
  var sortByUrl = function(patterns) {
    return patterns.sort(function(a, b) {
      return (a.url < b.url) ? -1 : 1;
    });
  };

  /**
   * @param {PatternItem[]} patterns
   * @returns {PatternItem[]}
   */
  var sortByMessage = function(patterns) {
    return patterns.sort(function(a, b) {
      if (a.msg === b.msg) {
        return (a.url < b.url) ? -1 : 1;
      }

      return (a.msg < b.msg) ? -1 : 1;
    });
  };

  return {
    sortByUrl: sortByUrl,
    sortByMessage: sortByMessage,
  };
})();
