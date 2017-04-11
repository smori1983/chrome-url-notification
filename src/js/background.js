(function() {

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var result;

    if ((result = urlNotifier.finder.findFor(request.url)) !== null) {
        result.style = {
            backgroundColor: "#" + result.backgroundColor,
            fontColor: "#ffffff"
        };

        sendResponse(result);
    }

    return true;
});

})();
