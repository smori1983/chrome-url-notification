(function() {

chrome.runtime.onInstalled.addListener(function() {
    urlNotifier.background.migrate();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(urlNotifier.background.find(request.url));
});

})();
