(function() {

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var result;

    if ((result = urlNotifier.finder.find(request.url)) !== null) {
        sendResponse(result);
    }

    return true;
});

})();
