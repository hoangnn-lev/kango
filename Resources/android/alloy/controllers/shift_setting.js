function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "shift_setting";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.shift_setting = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "shift_setting"
    });
    $.__views.shift_setting && $.addTopLevelView($.__views.shift_setting);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "main"
    });
    $.__views.shift_setting.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        top: 0,
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "シフト設定",
        id: "__alloyId118"
    });
    $.__views.title.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createScrollView({
        top: "0",
        bottom: 20,
        id: "__alloyId119"
    });
    $.__views.main.add($.__views.__alloyId119);
    $.__views.shift = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "shift"
    });
    $.__views.__alloyId119.add($.__views.shift);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shiftsCols = Alloy.Collections.shifts;
    var args = arguments[0] || {};
    var btnActiveBg = "#f3acbd", textActive = "ON", btnDeativeBg = "#e6e6e6", textDeactive = "OFF";
    shiftsCols.fetch({
        query: "SELECT * from shifts"
    });
    var n = shiftsCols.models.length;
    var shift = shiftsCols.models;
    for (var i = 0; n > i; i++) {
        var item = Ti.UI.createView({
            touchEnabled: true,
            selectedBackgroundColor: "transparent",
            width: Ti.UI.FILL,
            height: "50dp",
            id: shift[i].get("id"),
            zIndex: 1
        });
        item.addEventListener("click", function(e) {
            if ("button-right" == e.source.className || void 0 == e.source.id) return;
            openView("shift_detail", {
                id: e.source.id,
                tab: args["tab"]
            });
        });
        var button = Ti.UI.createButton({
            backgroundColor: shift[i].get("color"),
            width: "20dp",
            height: "20dp",
            touchEnabled: false,
            left: "10dp",
            className: "row-left-name"
        });
        item.add(button);
        item.add(Ti.UI.createLabel({
            left: "40dp",
            text: shift[i].get("name"),
            font: {
                fontSize: "15dp"
            },
            touchEnabled: false,
            color: "#676767",
            className: "label-shift"
        }));
        item.add(Ti.UI.createLabel({
            text: shift[i].get("time_shift"),
            id: shift[i].get("id"),
            font: {
                fontSize: "15dp"
            },
            color: "#676767",
            touchEnabled: false,
            className: "time"
        }));
        var background = btnDeativeBg, text = textDeactive;
        if (1 == shift[i].get("flag")) {
            background = btnActiveBg;
            text = textActive;
        }
        var button = Ti.UI.createButton({
            id: shift[i].get("id"),
            title: text,
            name: shift[i].get("name"),
            time_shift: shift[i].get("time_shift"),
            shiftcolor: shift[i].get("color"),
            flag: shift[i].get("flag"),
            height: "30dp",
            width: "50dp",
            backgroundColor: background,
            backgroundSelectedColor: background,
            right: "10dp",
            touchEnabled: true,
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            font: {
                fontSize: "15dp"
            },
            zIndex: 2,
            color: "#fff",
            className: "button-right"
        });
        button.addEventListener("click", function(e) {
            if (1 == e.source.flag) {
                this.setBackgroundColor(btnDeativeBg);
                this.setTitle(textDeactive);
                e.source.flag = 0;
            } else {
                this.setBackgroundColor(btnActiveBg);
                this.setTitle(textActive);
                e.source.flag = 1;
            }
            var shift = Alloy.createModel("shifts", {
                id: e.source.id,
                flag: e.source.flag,
                name: e.source.name,
                time_shift: e.source.time_shift,
                color: e.source.shiftcolor
            });
            Alloy.Collections.shifts.add(shift);
            shift.save();
            Alloy.Collections.shifts.fetch();
            delete_view("schedule");
            delete_view("shift");
        });
        item.add(button);
        item.add(Ti.UI.createLabel({
            backgroundColor: "#eeeeee",
            height: "1sp",
            width: Ti.UI.FILL,
            bottom: 0
        }));
        $.shift.add(item);
    }
    $.shift_setting.addEventListener("android:back", function() {
        Ti.API.activeTab = args["tab"];
        openView(1 == args["tab"] ? "shift" : "setting");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;