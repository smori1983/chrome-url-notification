var urlNotification = urlNotification || {};

urlNotification.background = (function() {
  var migrate = function() {
    while (urlNotification.migration.shouldMigrate()) {
      urlNotification.migration.migrateFrom(urlNotification.migration.currentVersion());
    }
  };

  var find = function(pattern) {
    var item;
    var result = {
      matched: false,
      data: null,
    };

    if ((item = urlNotification.finder.findFor(pattern)) !== null) {
      result.matched = true;
      result.data = {
        message: item.msg,
        backgroundColor: item.backgroundColor,
        fontColor: 'ffffff',
        displayPosition: item.displayPosition,
      };
    }

    return result;
  };

  return {
    migrate: function() {
      migrate();
    },
    find: function(pattern) {
      return find(pattern);
    },
  };
})();
