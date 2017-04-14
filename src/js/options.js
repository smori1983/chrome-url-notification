var util = (function() {
    var rebind = function(selector, eventName, callback) {
        $(selector).off(eventName).on(eventName, callback);
    };

    var modal = function(selector, events) {
        $.each($.extend({}, events), function(eventName, callback) {
            $(selector).on(eventName, callback);
        });

        var show = function() {
            $(selector).modal("show");
        };

        var hide = function() {
            $(selector).modal("hide");
        };

        return {
            show: show,
            hide: hide
        };
    };

    return {
        rebind: rebind,
        modal: modal
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
    };

    return {
        init: function() {
            initEventHandlers();
            showVersion();
        }
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
            return $("<button>").
                addClass("btn btn-sm").
                addClass(clazz).
                text(text);
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

        var patternColumn = function(item) {
            return column().text(item.url);
        };

        var messgeColumn = function(item) {
            return column().append(listMessage(item));
        };

        var actionColumn = function(item) {
            return column().addClass("action").
                append(copyButton(item)).
                append(editButton(item)).
                append(deleteButton(item));
        };

        var copyButton = function(item) {
            return button("btn-default", "コピー").click(function(e) {
                e.preventDefault();
                patternForm.show("add", {
                    url: item.url,
                    message: item.msg,
                    backgroundColor: item.backgroundColor
                });
            });
        };

        var editButton = function(item) {
            return button("btn-primary", "編集").click(function(e) {
                e.preventDefault();
                patternForm.show("edit", {
                    url: item.url,
                    message: item.msg,
                    backgroundColor: item.backgroundColor
                });
            });
        };

        var deleteButton = function(item) {
            return button("btn-danger", "削除").click(function(e) {
                e.preventDefault();
                deleteForm.show({
                    pattern: item.url,
                    message: item.msg
                });
            });
        };

        return function(item) {
            return row().
                append(patternColumn(item)).
                append(messgeColumn(item)).
                append(actionColumn(item));
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

    var modal = null;

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

        modal.show();
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
            modal.hide();
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
        modal = util.modal("#js_modal_pattern", {
            "shown.bs.modal": function() {
                $("#js_input_url").focus();
            }
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

    var bindValues = function(item) {
        $("#js_form_delete_pattern").text(item.pattern);
        $("#js_form_delete_message").text(item.message);
    };

    var modal = null;

    var show = function(item) {
        current = item;

        bindValues(current);

        util.rebind("#js_form_delete", "submit", function(e) {
            e.preventDefault();
            submit();
        });

        modal.show();
    };

    var submit = function() {
        urlNotifier.storage.deletePattern({
            url: current.pattern
        });
        modal.hide();
        patternListComponent.show();
    };

    var init = function() {
        modal = util.modal("#js_modal_delete");
    };

    return {
        init: function() {
            init();
        },
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
    patternListComponent.show();
    patternForm.init();
    deleteForm.init();
});
