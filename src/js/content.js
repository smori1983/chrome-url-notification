$(function() {

chrome.runtime.sendMessage({
    url: location.href
}, function(response) {
    if (response.matched === false) {
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
        background: "#" + response.data.backgroundColor,
        color:      "#" + response.data.fontColor,
        fontSize:   "12px",
        textAlign:  "center",
        fontFamily: "Meiryo",
        zIndex:     "1000",

        webkitUserSelect: "none"
    }).text(response.data.message);

    $("body").css({
        marginTop: (height + $("body").offset().top) + "px"
    }).append(container);
});

});
