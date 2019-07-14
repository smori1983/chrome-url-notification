(function() {

  const background = require('url-notification').background;

  chrome.runtime.onInstalled.addListener(function() {
    background.migrate();
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(background.find(request.url));
  });

})();
