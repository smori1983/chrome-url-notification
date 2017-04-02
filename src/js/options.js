var patternForm = (function() {
    var defaultValues = function() {
        return {
            url: "",
            message: "",
            backgroundColor: "000000"
        };
    };

    var current = {
        url: null,
        message: null,
        backgroundColor: null
    };

    var set = function(url, message, backgroundColor) {
        current.url = url;
        current.message = message;
        current.backgroundColor = backgroundColor;
    };

    var show = function(formValues) {
        var formValues = $.extend(
            defaultValues(),
            { mode: "add" },
            formValues
        );

        $("#js_form_pattern_mode").val(formValues.mode);
        $("#js_form_pattern_original_url").val(formValues.url);
        $("#js_input_url").val(formValues.url);
        $("#js_input_msg").val(formValues.message);
        $("#js_input_backgroundcolor").val(formValues.backgroundColor);


        $("#js_input_clear").off("click").on("click", function(e) {
            e.preventDefault();
            clear();
        });

        $("#js_form_pattern").off("submit").on("submit", function(e) {
            e.preventDefault();
            submit();
        });

        $("#js_modal_pattern").modal("show");
    };

    var clear = function() {
        var values = defaultValues();

        $("#js_input_url").val(values.url);
        $("#js_input_msg").val(values.message);
        $("#js_input_backgroundcolor").val(values.backgroundColor);
    };

    var submit = (function() {
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

    var init = function() {
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
    };

    return {
        init: function() {
            init();
        },
        show: function(formValues) {
            show(formValues);
        }
    };
})();

var deleteForm = (function() {
    var current = {
        pattern: null
    };

    var set = function(pattern) {
        current.pattern = pattern;
    };

    var show = function(pattern, message) {
        set(pattern);

        $("#js_form_delete_pattern").text(pattern);
        $("#js_form_delete_message").text(message);

        $("#js_form_delete").off("submit").on("submit", function(e) {
            e.preventDefault();
            submit();
        });

        $("#js_modal_delete").modal("show");
    };

    var submit = function() {
        urlNotifier.storage.deletePattern({
            url: current.pattern
        });
        $("#js_modal_delete").modal("hide");
        showPatternList();
    };

    return {
        show: function(pattern, message) {
            show(pattern, message);
        }
    };
})();

var showVersion = function() {
    $("#js_version").text("Ver. " + chrome.runtime.getManifest().version);
};

var showPatternList = function() {
    var listArea = $("#js_list_pattern");
    var sorted = urlNotifier.data.sortByMessage(urlNotifier.storage.getAll());

    $("#js_pattern_list_badge").text(sorted.length);

    listArea.empty();
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
            patternForm.show({
                mode: "add",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).appendTo(tdAction);

        button("btn btn-primary btn-sm", "編集").click(function(e) {
            e.preventDefault();
            patternForm.show({
                mode: "edit",
                url: item.url,
                message: item.msg,
                backgroundColor: item.backgroundColor
            });
        }).appendTo(tdAction);

        button("btn btn-danger btn-sm", "削除").click(function(e) {
            e.preventDefault();
            deleteForm.show(item.url, item.msg);
        }).appendTo(tdAction);

        return row().
            append(tdUrl).
            append(tdMsg).
            append(tdAction);
    };
})();

var initEventHandlers = function() {
    $("#js_button_add_pattern").click(function(e) {
        e.preventDefault();
        patternForm.show({});
    });
};

$(function() {
    initEventHandlers();
    patternForm.init();
    showVersion();
    showPatternList();
});
