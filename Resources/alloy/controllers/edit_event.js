function Controller() {
    function saveSchedule(e) {
        var title = $.title.getValue(), startTime = $.startTime.getValue(), endTime = $.endTime.getValue(), content = $.memo.getValue();
        $.title.blur();
        $.memo.blur();
        var scheduleDetailModel = Alloy.Collections.schedule_detail;
        var data = {
            schedule_id: func.getScheduleId(args["data"].day),
            title: title,
            start_time: startTime,
            end_time: endTime,
            content: content,
            img: Ti.API.selectedIcon
        };
        args["data"].id && (data["id"] = args["data"].id);
        var detail = Alloy.createModel("schedule_detail", data);
        scheduleDetailModel.add(detail);
        detail.save();
        if ("next" == e.source.type) {
            delete_view("schedule");
            openView("edit_event", {
                data: {
                    day: args["data"].day
                }
            });
        } else openView("schedule", {
            date: args["data"].day
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.edit_event = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "edit_event"
    });
    $.__views.edit_event && $.addTopLevelView($.__views.edit_event);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.edit_event
    });
    $.__views.tabMenu.setParent($.__views.edit_event);
    $.__views.main = Ti.UI.createView({
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        id: "main"
    });
    $.__views.edit_event.add($.__views.main);
    $.__views.content = Ti.UI.createScrollView({
        top: 0,
        bottom: 20,
        left: "10dp",
        right: "10dp",
        height: Ti.UI.FILL,
        id: "content",
        layout: "vertical"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "60dp",
        width: "120dp",
        id: "__alloyId0"
    });
    $.__views.content.add($.__views.__alloyId0);
    $.__views.date = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20dp"
        },
        left: "5dp",
        id: "date"
    });
    $.__views.__alloyId0.add($.__views.date);
    $.__views.dayName = Ti.UI.createLabel({
        width: "25dp",
        height: "25dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        backgroundImage: "/icons/bg-circle.png",
        left: "85dp",
        id: "dayName"
    });
    $.__views.__alloyId0.add($.__views.dayName);
    $.__views.title = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "30",
        id: "title",
        hintText: "タイトル"
    });
    $.__views.content.add($.__views.title);
    $.__views.startTime = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "5",
        id: "startTime",
        hintText: "開始時間"
    });
    $.__views.content.add($.__views.startTime);
    $.__views.endTime = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "5",
        id: "endTime",
        hintText: "終了時間"
    });
    $.__views.content.add($.__views.endTime);
    $.__views.memo = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: "80dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "120",
        id: "memo",
        hintText: "メモ"
    });
    $.__views.content.add($.__views.memo);
    $.__views.wicon = Ti.UI.createView({
        top: "10dp",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#e4f7ff",
        width: Ti.UI.FILL,
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "wicon"
    });
    $.__views.content.add($.__views.wicon);
    $.__views.listIcon = Ti.UI.createView({
        top: "5dp",
        bottom: "5dp",
        left: "5dp",
        right: "5dp",
        id: "listIcon"
    });
    $.__views.wicon.add($.__views.listIcon);
    $.__views.buttonTabs = Ti.UI.createScrollView({
        top: 20,
        bottom: "0",
        height: "40dp",
        backgroundColor: "#f9dce3",
        width: Ti.UI.FILL,
        layout: "horizontal",
        scrollType: "horizontal",
        id: "buttonTabs"
    });
    $.__views.wicon.add($.__views.buttonTabs);
    $.__views.groupButton = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId1 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#e6a3b3",
        backgroundSelectedColor: "#e6a3b3",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "15dp",
        title: "保存してカレンダーに戻る",
        id: "__alloyId1"
    });
    $.__views.groupButton.add($.__views.__alloyId1);
    saveSchedule ? $.__views.__alloyId1.addEventListener("click", saveSchedule) : __defers["$.__views.__alloyId1!click!saveSchedule"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#cfba9c",
        backgroundFocusedColor: "#c0ad91",
        backgroundSelectedColor: "#c0ad91",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "15dp",
        type: "next",
        title: "保存して別の予定を入力",
        id: "__alloyId2"
    });
    $.__views.groupButton.add($.__views.__alloyId2);
    saveSchedule ? $.__views.__alloyId2.addEventListener("click", saveSchedule) : __defers["$.__views.__alloyId2!click!saveSchedule"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, date = args["data"].day.split("-");
    Ti.API.selectedIcon = "";
    if (args["data"].id) {
        var scheduleDetailModel = Alloy.Collections.schedule_detail;
        scheduleDetailModel.fetch({
            query: "SELECT * from schedule_detail where id=" + args["data"].id
        });
        var data = scheduleDetailModel.models[0];
        $.title.setValue(data.get("title"));
        $.startTime.setValue(data.get("start_time"));
        $.endTime.setValue(data.get("end_time"));
        $.memo.setValue(data.get("content"));
        Ti.API.selectedIcon = data.get("img");
    }
    $.date.setText(date[1] + " / " + date[2]);
    $.dayName.setText(func.convertDayName(new Date(args["data"].day).getDay()));
    func.createBoxIcon($.buttonTabs, $.listIcon, Ti.API.selectedIcon);
    $.edit_event.addEventListener("android:back", function() {
        openView("schedule");
    });
    __defers["$.__views.__alloyId1!click!saveSchedule"] && $.__views.__alloyId1.addEventListener("click", saveSchedule);
    __defers["$.__views.__alloyId2!click!saveSchedule"] && $.__views.__alloyId2.addEventListener("click", saveSchedule);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;