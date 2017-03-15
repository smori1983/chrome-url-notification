(function() {

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var result;

    if ((result = urlNotifier.finder.find(request.url)) !== null) {

        var style = {};
        style.backgroundColor = "#" + result.backgroundColor;
        style.fontColor = "#ffffff";

        result.style = style;

        sendResponse(result);
    }

    return true;
});

})();
