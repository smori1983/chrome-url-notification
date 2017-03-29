$(function() {

chrome.runtime.sendMessage({
    url: location.href
}, function(result) {
    if (result === null) {
        return;
    }

    var height = 50;

    var container = $("<div>").css({
        position:   "fixed",
        top:        "0px",
        left:       "0px",
        width:      "100%",
        height:     height + "px",
        lineHeight: height + "px",
        background: result.style.backgroundColor,
        color:      result.style.fontColor,
        fontSize:   "12px",
        textAlign:  "center",
        fontFamily: "Meiryo",
        zIndex:     "1000",

        webkitUserSelect: "none"
    }).text(result.msg);

    $("body").css({
        marginTop: (height + $("body").offset().top) + "px"
    }).append(container);
});

});
