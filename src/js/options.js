var showVersion = function() {
    $("#js_version").text("Ver. " + chrome.runtime.getManifest().version);
};

var showPatternList = function() {
    var listArea = $("#js_list_pattern");

    listArea.empty();

    var sorted = urlNotifier.data.sortByMessage(urlNotifier.storage.getAll());

    $("#js_pattern_list_badge").text(sorted.length);

    $.each(sorted, function(idx, item) {
        makeRow(item).appendTo(listArea);
    });
};

var makeRow = (function() {
    var listMessageCss = function(item) {
        return {
            "background-color": "#" + item.backgroundColor,
            "color": "#ffffff"
        };
    };

    var row = function() {
        return $("<tr>");
    };

    var column = function() {
        return $("<td>");
    };

    var button = function(clazz, text) {
        return $("<button>").addClass(clazz).text(text);
    };

    return function(item) {
        var tdUrl = column().text(item.url);

        var tdMsg = column().append(
            $("<div>").
                addClass("list-message").
                css(listMessageCss(item)).
                text(item.msg)
        );

        var tdAction = column().addClass("action");

        button("btn btn-default btn-sm", "コピー").click(function(e) {
            e.preventDefault();
            openPatternForm({
                mode: "add",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).appendTo(tdAction);

        button("btn btn-primary btn-sm", "編集").click(function(e) {
            e.preventDefault();
            openPatternForm({
                mode: "edit",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).appendTo(tdAction);

        button("btn btn-danger btn-sm", "削除").click(function(e) {
            e.preventDefault();
            openDeleteForm({
                url: item.url,
                message: item.msg
            });
        }).appendTo(tdAction);

        return row().
            append(tdUrl).
            append(tdMsg).
            append(tdAction);
    };
})();

var formDefaultValues = function() {
    return {
        url: "",
        message: "",
        backgroundColor: "000000"
    };
};

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

var clearPatternForm = function() {
    var values = formDefaultValues();

    $("#js_input_url").val(values.url);
    $("#js_input_msg").val(values.message);
    $("#js_input_backgroundcolor").val(values.backgroundColor);
};

var submitPatternForm = (function() {
    var error = {
        required: "未入力の項目があります。",
        duplicated: "入力されたURLパターンは既に登録されています。"
    };

    var trimValue = function(selector) {
        return $(selector).val().trim();
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

    var end = function() {
        $(".colorpicker").hide();
        $("#js_modal_pattern").modal("hide");
        showPatternList();
    };

    return function() {
        var mode = trimValue("#js_form_pattern_mode");
        var originalUrl = trimValue("#js_form_pattern_original_url");
        var url = trimValue("#js_input_url");
        var msg = trimValue("#js_input_msg");
        var backgroundColor = trimValue("#js_input_backgroundcolor");

        if (url === "" || msg === "" || backgroundColor === "") {
            patternMsg.show(error.required);
            return;
        }

        var saveData = {
            url: url,
            msg: msg,
            backgroundColor: backgroundColor
        };

        if (mode === "add") {
            if (urlNotifier.storage.findByUrl(url)) {
                patternMsg.show(error.duplicated);
                return;
            }

            urlNotifier.storage.addPattern(saveData);
            end();
        }

        if (mode === "edit") {
            if (originalUrl !== url && urlNotifier.storage.findByUrl(url)) {
                patternMsg.show(error.duplicated);
                return;
            }

            urlNotifier.storage.updatePattern(originalUrl, saveData);
            end();
        }
    };
})();

var openDeleteForm = function(formValues) {
    $("#js_form_delete_pattern").text(formValues.url);
    $("#js_form_delete_message").text(formValues.message);

    $("#js_modal_delete").modal("show");
};

var submitDeleteForm = function() {
    urlNotifier.storage.deletePattern({
        url: $("#js_form_delete_pattern").text()
    });
    $("#js_modal_delete").modal("hide");
    showPatternList();
};

var initEventHandlers = function() {
    $("#js_button_add_pattern").click(function(e) {
        e.preventDefault();
        openPatternForm({});
    });

    $("#js_modal_pattern").on("shown.bs.modal", function() {
        $("#js_input_url").focus();
    });

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

    $("#js_input_clear").click(function(e) {
        e.preventDefault();
        clearPatternForm();
    });

    $("#js_form_pattern").submit(function(e) {
        e.preventDefault();
        submitPatternForm();
    });

    $("#js_form_delete").submit(function(e) {
        e.preventDefault();
        submitDeleteForm();
    });
};

$(function() {
    initEventHandlers();
    showVersion();
    showPatternList();
});
