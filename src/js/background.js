(function() {

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var response = {
        matched: false,
        data: null
    };

    if ((item = urlNotifier.finder.findFor(request.url)) !== null) {
        response.matched = true;
        response.data = {
            message: item.msg,
            backgroundColor: item.backgroundColor,
            fontColor: "ffffff"
        };
    }

    sendResponse(response);
});

})();
