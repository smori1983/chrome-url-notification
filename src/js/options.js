var util = (function() {
    var rebind = function(selector, eventName, callback) {
        $(selector).off(eventName).on(eventName, callback);
    };

    return {
        rebind: rebind
    };
})();

var headerComponent = (function() {
    var showVersion = function() {
        $("#js_version").text("Ver. " + chrome.runtime.getManifest().version);
    };

    var initEventHandlers = function() {
        $("#js_button_add_pattern").click(function(e) {
            e.preventDefault();
            patternForm.show("add", {});
        });

        $("#js_button_export").click(function(e) {
            e.preventDefault();
            exportCompoenent.show();
        });
    };

    return {
        init: function() {
            initEventHandlers();
            showVersion();
        }
    };
})();

var exportCompoenent = (function() {
    var init = function() {
        var clipboard = new Clipboard("#js_export_copy");

        clipboard.on("success", function(e) {
            e.clearSelection();
        });
    };

    var show = function() {
        var data = urlNotifier.storage.getAll();
        var jsonString = JSON.stringify(data, null, 4);

        $("#js_export_display").html(jsonString);
        $("#js_modal_export").modal("show");
    };

    return {
        init: init,
        show: show
    };
})();

var patternListComponent = (function() {
    var show = function() {
        var listArea = $("#js_list_pattern");
        var sorted = urlNotifier.data.sortByMessage(urlNotifier.storage.getAll());

        $("#js_pattern_list_badge").text(sorted.length);

        listArea.empty();
        $.each(sorted, function(idx, item) {
            makeRow(item).appendTo(listArea);
        });
    };

    var makeRow = (function() {
        var row = function() {
            return $("<tr>");
        };

        var column = function() {
            return $("<td>");
        };

        var button = function(clazz, text) {
            return $("<button>").addClass(clazz).text(text);
        };

        var listMessage = function(item) {
            return $("<div>").
                addClass("list-message").
                css(listMessageCss(item)).
                text(item.msg);
        };

        var listMessageCss = function(item) {
            return {
                "background-color": "#" + item.backgroundColor,
                "color": "#ffffff"
            };
        };

        return function(item) {
            var tdUrl = column().text(item.url);

            var tdMsg = column().append(listMessage(item));

            var tdAction = column().addClass("action");

            button("btn btn-default btn-sm", "コピー").click(function(e) {
                e.preventDefault();
                patternForm.show("add", {
                    url: item.url,
                    message: item.msg,
                    backgroundColor: item.backgroundColor
                });
            }).appendTo(tdAction);

            button("btn btn-primary btn-sm", "編集").click(function(e) {
                e.preventDefault();
                patternForm.show("edit", {
                    url: item.url,
                    message: item.msg,
                    backgroundColor: item.backgroundColor
                });
            }).appendTo(tdAction);

            button("btn btn-danger btn-sm", "削除").click(function(e) {
                e.preventDefault();
                deleteForm.show({
                    pattern: item.url,
                    message: item.msg
                });
            }).appendTo(tdAction);

            return row().
                append(tdUrl).
                append(tdMsg).
                append(tdAction);
        };
    })();

    return {
        show: function() {
            show();
        }
    };
})();

var patternForm = (function() {
    var defaultValues = function() {
        return {
            url: "",
            message: "",
            backgroundColor: "000000"
        };
    };

    var mode = null;

    var original = null;

    var bindValues = function(formValues) {
        $("#js_input_url").val(formValues.url);
        $("#js_input_msg").val(formValues.message);
        $("#js_input_backgroundcolor").val(formValues.backgroundColor);
    };

    var show = function(argMode, argOriginal) {
        mode = argMode;
        original = argOriginal;

        bindValues($.extend(defaultValues(), original));

        util.rebind("#js_input_clear", "click", function(e) {
            e.preventDefault();
            clear();
        });

        util.rebind("#js_form_pattern", "submit", function(e) {
            e.preventDefault();
            submit();
        });

        $("#js_modal_pattern").modal("show");
    };

    var clear = function() {
        bindValues(defaultValues());
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
            patternListComponent.show();
        };

        return function() {
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
                if (original.url !== url && urlNotifier.storage.findByUrl(url)) {
                    patternMsg.show(error.duplicated);
                    return;
                }

                urlNotifier.storage.updatePattern(original.url, saveData);
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
        }).on("keyup", function(){
            $(this).ColorPickerSetColor(this.value);
        });
    };

    return {
        init: function() {
            init();
        },
        /**
         * mode: "add" or "edit"
         *
         * formValues
         * - url
         * - message
         * - backgroundColor
         */
        show: function(mode, formValues) {
            show(mode, formValues);
        }
    };
})();

var deleteForm = (function() {
    var current = null;

    var show = function(item) {
        current = item;

        $("#js_form_delete_pattern").text(item.pattern);
        $("#js_form_delete_message").text(item.message);

        util.rebind("#js_form_delete", "submit", function(e) {
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
        patternListComponent.show();
    };

    return {
        /**
         * item
         * - pattern
         * - message
         */
        show: function(item) {
            show(item);
        }
    };
})();

$(function() {
    headerComponent.init();
    exportCompoenent.init();
    patternListComponent.show();
    patternForm.init();
});
