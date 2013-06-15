$(function() {

var showPatternList = function() {
    var id = "#js_list_pattern";

    $(id).empty();

    $.each(urlNotifier.storage.getAllPattern(), function(idx, item) {
        var tdUrl, tdMsg, tdDelete, aDelete;

        tdUrl = $("<td>").
            addClass("pRight50").
            text(item.url);

        tdMsg = $("<td>").
            addClass("pRight50").
            text(item.msg);

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

$("#js_form_pattern").submit(function(e) {
    e.preventDefault();

    var url = $("#js_input_url").val(),
        msg = $("#js_input_msg").val();

    if (url !== "" && msg !== "") {
        urlNotifier.storage.addPattern(url, msg);
        showPatternList();
    }
});


showPatternList();

});
