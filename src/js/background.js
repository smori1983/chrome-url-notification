(function() {

  const urlNotification = require('url-notification');

  chrome.runtime.onInstalled.addListener(function() {
    urlNotification.background.migrate();
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(urlNotification.background.find(request.url));
  });

})();
