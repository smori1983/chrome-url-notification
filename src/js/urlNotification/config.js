var urlNotification = urlNotification || {};

urlNotification.config = (function() {
  const version = 2;

  /**
   * used for migration from 0 to 1
   */
  const defaultBackgroundColor = '000000';

  /**
   * used for migration from 1 to 2
   */
  const defaultDisplayPosition = 'top';

  return {
    version: function() {
      return version;
    },
    defaultBackgroundColor: function() {
      return defaultBackgroundColor;
    },
    defaultDisplayPosition: function() {
      return defaultDisplayPosition;
    },
  };
})();
