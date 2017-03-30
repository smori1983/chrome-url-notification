$(function() {

var showPatternList = function() {
    var listArea = $("#js_list_pattern");

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
        addClass("btn btn-default btn-sm").
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
        addClass("btn btn-primary btn-sm").
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
        addClass("btn btn-danger btn-sm").
        text("削除").
        click(function(e) {
            e.preventDefault();
            openDeleteForm({
                url: item.url,
                message: item.msg
            });
        }).
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

var openPatternForm = function(formValues) {
    var formValues = $.extend(
        formDefaultValues(),
        { mode: "add" },
        formValues
    );

    $("#js_form_pattern_mode").val(formValues.mode);
    $("#js_form_pattern_original_url").val(formValues.url);
    $("#js_input_url").val(formValues.url);
    $("#js_input_msg").val(formValues.message);
    $("#js_input_backgroundcolor").val(formValues.backgroundColor);

    $("#js_modal_pattern").modal("show");
};

$("#js_modal_pattern").on("shown.bs.modal", function() {
    $("#js_input_url").focus();
});

var openDeleteForm = function(formValues) {
    $("#js_form_delete_pattern").text(formValues.url);
    $("#js_form_delete_message").text(formValues.message);

    $("#js_modal_delete").modal("show");
};

$("#js_input_backgroundcolor").ColorPicker({
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

$("#js_button_add_pattern").click(function(e) {
    e.preventDefault();
    openPatternForm({});
});

$("#js_form_pattern").submit(function(e) {
    e.preventDefault();

    var trimValue = function(selector) {
        return $(selector).val().trim();
    };

    var mode = trimValue("#js_form_pattern_mode");
    var originalUrl = trimValue("#js_form_pattern_original_url");
    var url = trimValue("#js_input_url");
    var msg = trimValue("#js_input_msg");
    var backgroundColor = trimValue("#js_input_backgroundcolor");

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
        $(".colorpicker").hide();
        $("#js_modal_pattern").modal("hide");
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

$("#js_input_clear").click(function(e) {
    e.preventDefault();

    var values = formDefaultValues();

    $("#js_input_url").val(values.url);
    $("#js_input_msg").val(values.message);
    $("#js_input_backgroundcolor").val(values.backgroundColor);
});

$("#js_form_delete").submit(function(e) {
    e.preventDefault();

    urlNotifier.storage.deletePattern({
        url: $("#js_form_delete_pattern").text()
    });
    $("#js_modal_delete").modal("hide");
    showPatternList();
});


showPatternList();

});
