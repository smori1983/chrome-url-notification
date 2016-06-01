$(function() {

var showPatternList = function() {
    var id = "#js_list_pattern";

    $(id).empty();

    $.each(urlNotifier.storage.getAll(), function(idx, item) {
        var tdUrl, tdMsg, tdDelete, aDelete;

        tdUrl = $("<td>").
            addClass("pRight50").
            text(item.url);

        tdMsg = $("<td>").
            addClass("pRight50").
            append(
                $("<div>").
                    addClass("list-message").
                    css({
                        "background-color": "#000000",
                        "color": "#ffffff"
                    }).
                    text(item.msg)
            );

        aDelete = $("<a>").
            css({
                color:  "#0044cc",
                cursor: "pointer"
            }).
            text("削除").
            click(function(e) {
                e.preventDefault();

                if (confirm(item.url + " を削除します。")) {
                    urlNotifier.storage.deletePattern(item);
                    showPatternList();
                }
            });

        tdDelete = $("<td>").
            addClass("pRight50").
            append(aDelete);

        $("<tr>").
            append(tdUrl).
            append(tdMsg).
            append(tdDelete).
            appendTo($(id));
    });
};

var patternMsg = (function() {
    var that = {},
        timeoutId = null;

    that.show = function(msg) {
        $("#js_msg_pattern").text(msg);

        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(function() {
            timeoutId = null;
            that.hide();
        }, 2000);
    };

    that.hide = function() {
        $("#js_msg_pattern").empty();
    };

    return that;
})();

$("#js_form_pattern").submit(function(e) {
    e.preventDefault();

    var url = $("#js_input_url").val().trim(),
        msg = $("#js_input_msg").val().trim();

    if (url === "" || msg === "") {
        patternMsg.show("未入力の項目があります。");
    } else if (urlNotifier.storage.findByUrl(url)) {
        patternMsg.show("入力されたURLパターンは既に登録されています。");
    } else {
        urlNotifier.storage.addPattern({
            url: url,
            msg: msg
        });
        showPatternList();
    }
});


showPatternList();

});
