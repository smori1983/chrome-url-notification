$(function() {

var selector = {}
selector.patternForm = "#js_form_pattern";
selector.inputOriginalUrl = "#js_form_pattern_original_url";
selector.inputUrl = "#js_input_url";
selector.inputMsg = "#js_input_msg";
selector.inputBackgroundColor = "#js_input_backgroundcolor";
selector.formClear = "#js_input_clear";
selector.msgPattern = "#js_msg_pattern";
selector.listArea = "#js_list_pattern";
selector.formAdd = "#js_form_add_pattern";
selector.formPatternMode = "#js_form_pattern_mode";
selector.modalPattern = "#js_modal_pattern";

var showPatternList = function() {
    var listArea = $(selector.listArea);

    listArea.empty();

    var sorted = urlNotifier.data.sortByMessage(urlNotifier.storage.getAll());

    $.each(sorted, function(idx, item) {
        makeRow(item).appendTo(listArea);
    });
};

var makeRow = function (item) {
    var tdUrl, tdMsg, tdDelete, aEdit, aDelete;

    tdUrl = $("<td>").
        addClass("pRight50").
        text(item.url);

    tdMsg = $("<td>").
        addClass("pRight50").
        append(
            $("<div>").
                addClass("list-message").
                css({
                    "background-color": "#" + item.backgroundColor,
                    "color": "#ffffff"
                }).
                text(item.msg)
        );

    aEdit = $("<a>").
        css({
            marginRight: "10px",
            color: "#000000",
            cursor: "pointer"
        }).
        text("編集").
        click(function(e) {
            e.preventDefault();

            openPatternForm({
                mode: "edit",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        });

    aDelete = $("<a>").
        css({
            color: "#bb0000",
            cursor: "pointer"
        }).
        text("削除").
        click(function(e) {
            e.preventDefault();

            $(this).next("span").show();
        });

    aDeleteConfirm = $("<span>").
        css({
            "display": "none",
            "padding": "0px 20px"
        }).
        append(
            $("<a>").
                css({
                    "background": "#0044cc",
                    "color": "#ffffff",
                    "margin": "0px 5px",
                    "padding": "3px 10px",
                    "cursor": "pointer",
                    "border-radius": "3px"
                }).
                text("OK").
                click(function(e) {
                    e.preventDefault();
                    urlNotifier.storage.deletePattern(item);
                    showPatternList();
                })
        ).
        append(
            $("<a>").
                css({
                    "background": "#444444",
                    "color": "#ffffff",
                    "margin": "0px 5px",
                    "padding": "3px 10px",
                    "cursor": "pointer",
                    "border-radius": "3px"
                }).
                text("キャンセル").
                click(function(e) {
                    e.preventDefault();
                    $(this).parent().hide();
                })
        );

    tdDelete = $("<td>").
        addClass("pRight50").
        append(aEdit).
        append(aDelete).
        append(aDeleteConfirm);

    return $("<tr>").
        append(tdUrl).
        append(tdMsg).
        append(tdDelete);
};

var patternMsg = (function() {
    var that = {},
        timeoutId = null;

    that.show = function(msg) {
        $(selector.msgPattern).text(msg);

        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(function() {
            timeoutId = null;
            that.hide();
        }, 2000);
    };

    that.hide = function() {
        $(selector.msgPattern).empty();
    };

    return that;
})();

var openPatternForm = function(formValues) {
    var formValues = $.extend({
        mode: "add",
        url: "",
        message: "",
        backgroundColor: "000000"
    }, formValues);

    $(selector.formPatternMode).val(formValues.mode);
    $(selector.inputOriginalUrl).val(formValues.url);
    $(selector.inputUrl).val(formValues.url);
    $(selector.inputMsg).val(formValues.message);
    $(selector.inputBackgroundColor).val(formValues.backgroundColor);

    $(selector.modalPattern).modal({
        showClose: false,
        modalClass: "modal",
        fadeDuration: 100
    });
};

$(selector.inputBackgroundColor).ColorPicker({
    onSubmit: function(hsb, hex, rgb, el) {
        $(el).val(hex);
        $(el).ColorPickerHide();
    },
    onBeforeShow: function () {
        $(this).ColorPickerSetColor(this.value);
    }
}).bind("keyup", function(){
    $(this).ColorPickerSetColor(this.value);
});

$(selector.formAdd).submit(function(e) {
    e.preventDefault();

    openPatternForm({});
});

$(selector.patternForm).submit(function(e) {
    e.preventDefault();

    var mode = $(selector.formPatternMode).val().trim();
    var originalUrl = $(selector.inputOriginalUrl).val().trim();
    var url = $(selector.inputUrl).val().trim();
    var msg = $(selector.inputMsg).val().trim();
    var backgroundColor = $(selector.inputBackgroundColor).val().trim();

    if (url === "" || msg === "" || backgroundColor === "") {
        patternMsg.show("未入力の項目があります。");
        return;
    }

    if (mode === "add") {
        if (urlNotifier.storage.findByUrl(url)) {
            patternMsg.show("入力されたURLパターンは既に登録されています。");
        } else {
            urlNotifier.storage.addPattern({
                url: url,
                msg: msg,
                backgroundColor: backgroundColor
            });
            $.modal.close();
            showPatternList();
        }
    }

    if (mode === "edit") {
        if (originalUrl !== url) {
            if (urlNotifier.storage.findByUrl(url)) {
                patternMsg.show("入力されたURLパターンは既に登録されています。");
                return;
            }
        }

        urlNotifier.storage.updatePattern(originalUrl, {
            url: url,
            msg: msg,
            backgroundColor: backgroundColor
        });
        $.modal.close();
        showPatternList();
    }
});

$(selector.formClear).click(function(e) {
    e.preventDefault();

    $(selector.inputUrl).val("");
    $(selector.inputMsg).val("");
    $(selector.inputBackgroundColor).val("000000");
});


showPatternList();

});
