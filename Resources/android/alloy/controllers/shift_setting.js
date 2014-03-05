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
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        layout: "horizontal",
        id: "tabMenu",
        __parentSymbol: $.__views.shift_setting
    });
    $.__views.tabMenu.setParent($.__views.shift_setting);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        layout: "vertical",
        id: "main"
    });
    $.__views.shift_setting.add($.__views.main);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        top: "10dp",
        id: "title",
        text: "タップで名前を変更できます"
    });
    $.__views.main.add($.__views.title);
    $.__views.shift = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        layout: "vertical",
        id: "shift"
    });
    $.__views.main.add($.__views.shift);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shiftsCols = Alloy.Collections.shifts;
    var args = arguments[0] || {};
    var btnActiveBg = "#f3acbd", textActive = "使う", btnDeativeBg = "#e6e6e6", textDeactive = "要らない";
    shiftsCols.fetch({
        query: "SELECT * from shifts"
    });
    var n = shiftsCols.models.length;
    var shift = shiftsCols.models;
    for (var i = 0; n > i; i++) {
        var item = Ti.UI.createView({
            touchEnabled: false,
            selectedBackgroundColor: "transparent",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var button = Ti.UI.createButton({
            backgroundColor: shift[i].get("color"),
            width: "80dp",
            height: "30dp",
            left: "10dp",
            top: "10dp",
            bottom: "10dp",
            title: shift[i].get("alias"),
            touchEnabled: true,
            id: shift[i].get("id"),
            borderColor: "#f0f0f0",
            color: "#676767",
            borderWidth: 1,
            className: "row-left-name"
        });
        button.addEventListener("click", function(e) {
            openView("shift_detail", {
                id: e.source.id
            });
        });
        item.add(button);
        item.add(Ti.UI.createLabel({
            text: shift[i].get("time"),
            font: {
                fontSize: "15dp"
            },
            color: "#676767",
            className: "time",
            touchEnabled: false
        }));
        var background = btnDeativeBg, text = textDeactive;
        if (1 == shift[i].get("status")) {
            background = btnActiveBg;
            text = textActive;
        }
        var button = Ti.UI.createButton({
            id: shift[i].get("id"),
            title: text,
            label: shift[i].get("label"),
            alias: shift[i].get("alias"),
            time: shift[i].get("time"),
            shiftcolor: shift[i].get("color"),
            status: shift[i].get("status"),
            height: "35dp",
            width: "75dp",
            backgroundColor: background,
            backgroundSelectedColor: background,
            right: "10dp",
            touchEnabled: true,
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            font: {
                fontSize: "15dp"
            },
            zIndex: 1,
            color: "#fff",
            className: "button-right"
        });
        button.addEventListener("click", function(e) {
            if (1 == e.source.status) {
                this.setBackgroundColor(btnDeativeBg);
                this.setTitle(textDeactive);
                e.source.status = 0;
            } else {
                this.setBackgroundColor(btnActiveBg);
                this.setTitle(textActive);
                e.source.status = 1;
            }
            var shift = Alloy.createModel("shifts", {
                id: e.source.id,
                status: e.source.status,
                label: e.source.label,
                alias: e.source.alias,
                time: e.source.time,
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