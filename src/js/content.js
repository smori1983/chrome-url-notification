$(function() {

chrome.runtime.sendMessage({
    url: location.href
}, function(result) {
    var container;

    container = $("<div>").css({
        position:   "fixed",
        top:        "0px",
        left:       "0px",
        width:      "100%",
        height:     "50px",
        lineHeight: "50px",
        background: "#000000",
        color:      "#ffffff",
        fontSize:   "12px",
        textAlign:  "center",
        fontFamily: "Meiryo",
        zIndex:     "1000",

        webkitUserSelect: "none"
    }).text(result.msg);

    $("body").css({
        marginTop: "50px"
    }).append(container);
});

});
