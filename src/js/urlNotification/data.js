var urlNotification = urlNotification || {};

urlNotification.data = (function() {
  var sortByUrl = function(patterns) {
    return patterns.sort(function(a, b) {
      return (a.url < b.url) ? -1 : 1;
    });
  };

  var sortByMessage = function(patterns) {
    return patterns.sort(function(a, b) {
      if (a.msg === b.msg) {
        return (a.url < b.url) ? -1 : 1;
      }

      return (a.msg < b.msg) ? -1 : 1;
    });
  };

  return {
    sortByUrl: function(patterns) {
      return sortByUrl(patterns);
    },
    sortByMessage: function(patterns) {
      return sortByMessage(patterns);
    }
  }
})();
