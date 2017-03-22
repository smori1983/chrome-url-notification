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
selector.buttonAdd = "#js_button_add_pattern";
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

var formDefaultValues = function() {
    return {
        url: "",
        message: "",
        backgroundColor: "000000"
    };
};

var makeRow = function (item) {
    var tdUrl, tdMsg, tdAction;

    var listMessageCss = function(item) {
        return {
            "background-color": "#" + item.backgroundColor,
            "color": "#ffffff"
        };
    };

    tdUrl = $("<td>").
        text(item.url);

    tdMsg = $("<td>").
        append(
            $("<div>").
                addClass("list-message").
                css(listMessageCss(item)).
                text(item.msg)
        );

    tdAction = $("<td>").
        addClass("action");

    $("<button>").
        addClass("btn btn-default btn-xs").
        text("コピー").
        click(function(e) {
            e.preventDefault();
            openPatternForm({
                mode: "add",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).
        appendTo(tdAction);

    $("<button>").
        addClass("btn btn-primary btn-xs").
        text("編集").
        click(function(e) {
            e.preventDefault();
            openPatternForm({
                mode: "edit",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).
        appendTo(tdAction);

    $("<button>").
        addClass("btn btn-danger btn-xs").
        text("削除").
        click(function(e) {
            e.preventDefault();
            $(this).next("span").show();
        }).
        appendTo(tdAction);

    $("<span>").
        addClass("list-action-delete-confirm").
        append(
            $("<a>").
                addClass("btn btn-warning btn-xs list-action-delete-accept").
                text("OK").
                click(function(e) {
                    e.preventDefault();
                    urlNotifier.storage.deletePattern(item);
                    showPatternList();
                })
        ).
        append(
            $("<a>").
                addClass("btn btn-default btn-xs list-action-delete-cancel").
                text("キャンセル").
                click(function(e) {
                    e.preventDefault();
                    $(this).parent().hide();
                })
        ).
        appendTo(tdAction);

    return $("<tr>").
        append(tdUrl).
        append(tdMsg).
        append(tdAction);
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
    var formValues = $.extend(
        formDefaultValues(),
        { mode: "add" },
        formValues
    );

    $(selector.formPatternMode).val(formValues.mode);
    $(selector.inputOriginalUrl).val(formValues.url);
    $(selector.inputUrl).val(formValues.url);
    $(selector.inputMsg).val(formValues.message);
    $(selector.inputBackgroundColor).val(formValues.backgroundColor);

    $(selector.modalPattern).modal({
        showClose: false,
        modalClass: "modal",
        fadeDuration: 100
    }).on($.modal.OPEN, function(e, modal) {
        $(selector.inputUrl).focus();
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

$(selector.buttonAdd).click(function(e) {
    e.preventDefault();
    openPatternForm({});
});

$(selector.patternForm).submit(function(e) {
    e.preventDefault();

    var trimValue = function(selector) {
        return $(selector).val().trim();
    };

    var mode = trimValue(selector.formPatternMode);
    var originalUrl = trimValue(selector.inputOriginalUrl);
    var url = trimValue(selector.inputUrl);
    var msg = trimValue(selector.inputMsg);
    var backgroundColor = trimValue(selector.inputBackgroundColor);

    if (url === "" || msg === "" || backgroundColor === "") {
        patternMsg.show("未入力の項目があります。");
        return;
    }

    var saveData = {
        url: url,
        msg: msg,
        backgroundColor: backgroundColor
    };

    var errorDuplicated = "入力されたURLパターンは既に登録されています。";

    var end = function() {
        $.modal.close();
        showPatternList();
    };

    if (mode === "add") {
        if (urlNotifier.storage.findByUrl(url)) {
            patternMsg.show(errorDuplicated);
            return;
        }

        urlNotifier.storage.addPattern(saveData);
        end();
    }

    if (mode === "edit") {
        if (originalUrl !== url && urlNotifier.storage.findByUrl(url)) {
            patternMsg.show(errorDuplicated);
            return;
        }

        urlNotifier.storage.updatePattern(originalUrl, saveData);
        end();
    }
});

$(selector.formClear).click(function(e) {
    e.preventDefault();

    var values = formDefaultValues();

    $(selector.inputUrl).val(values.url);
    $(selector.inputMsg).val(values.message);
    $(selector.inputBackgroundColor).val(values.backgroundColor);
});


showPatternList();

});
