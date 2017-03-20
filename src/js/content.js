$(function() {

chrome.runtime.sendMessage({
    url: location.href
}, function(result) {
    if (result === null) {
        return;
    }

    var height = "30px"

    var container = $("<div>").css({
        position:   "fixed",
        top:        "0px",
        left:       "0px",
        width:      "100%",
        height:     height,
        lineHeight: height,
        background: result.style.backgroundColor,
        color:      result.style.fontColor,
        fontSize:   "12px",
        textAlign:  "center",
        fontFamily: "Meiryo",
        zIndex:     "1000",

        webkitUserSelect: "none"
    }).text(result.msg);

    $("body").css({
        marginTop: height
    }).append(container);
});

});
