(function() {

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(urlNotifier.background.find(request.url));
});

})();
