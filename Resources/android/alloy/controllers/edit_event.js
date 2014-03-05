function Controller() {
    function saveSchedule() {
        var title = $.title.getValue(), startTime = $.startTime.getText(), endTime = $.endTime.getText(), content = $.memo.getValue();
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
        func.writeLogImg(Ti.API.selectedIcon);
        args["data"].id && (data["id"] = args["data"].id);
        var detail = Alloy.createModel("schedule_detail", data);
        scheduleDetailModel.add(detail);
        detail.save();
        openView("schedule", {
            date: args["data"].day
        });
    }
    function timeSet(e) {
        if ("delete" == e.source.type) return;
        var get_time = new Date(), child = this.getChildren();
        var time = child[1].text ? child[1].text.split(":") : [ 0, 0 ];
        get_time.setHours(time[0]);
        get_time.setMinutes(time[1]);
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_TIME,
            format24: true,
            useSpinner: true,
            selectionIndicator: true
        });
        picker.showTimePickerDialog({
            value: get_time,
            format24: true,
            callback: function(e) {
                if (!e.cancel) {
                    var result = pad_2(e.value.getHours()) + ":" + pad_2(e.value.getMinutes());
                    child[1].setText(result);
                    child[2].setVisible(true);
                }
            }
        });
    }
    function pad_2(number) {
        return (10 > number ? "0" : "") + number;
    }
    function clearTime(e) {
        this.setVisible(false);
        "clearStartTime" == e.source.id ? $.startTime.setText("") : $.endTime.setText("");
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
        layout: "horizontal",
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
    $.__views.__alloyId2 = Ti.UI.createView({
        height: "60dp",
        width: "120dp",
        id: "__alloyId2"
    });
    $.__views.content.add($.__views.__alloyId2);
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
    $.__views.__alloyId2.add($.__views.date);
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
    $.__views.__alloyId2.add($.__views.dayName);
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
    $.__views.__alloyId3 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        id: "__alloyId3"
    });
    $.__views.content.add($.__views.__alloyId3);
    timeSet ? $.__views.__alloyId3.addEventListener("click", timeSet) : __defers["$.__views.__alloyId3!click!timeSet"] = true;
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "開始時間",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.startTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "90dp",
        id: "startTime"
    });
    $.__views.__alloyId3.add($.__views.startTime);
    $.__views.clearStartTime = Ti.UI.createLabel({
        width: "50dp",
        height: "30dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        right: "5dp",
        backgroundColor: "#aeaeae",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        zIndex: 5,
        visible: false,
        type: "delete",
        id: "clearStartTime",
        text: "削除"
    });
    $.__views.__alloyId3.add($.__views.clearStartTime);
    clearTime ? $.__views.clearStartTime.addEventListener("click", clearTime) : __defers["$.__views.clearStartTime!click!clearTime"] = true;
    $.__views.__alloyId5 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        id: "__alloyId5"
    });
    $.__views.content.add($.__views.__alloyId5);
    timeSet ? $.__views.__alloyId5.addEventListener("click", timeSet) : __defers["$.__views.__alloyId5!click!timeSet"] = true;
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "終了時間",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.endTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "90dp",
        id: "endTime"
    });
    $.__views.__alloyId5.add($.__views.endTime);
    $.__views.clearEndTime = Ti.UI.createLabel({
        width: "50dp",
        height: "30dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        right: "5dp",
        backgroundColor: "#aeaeae",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        zIndex: 5,
        visible: false,
        type: "delete",
        id: "clearEndTime",
        text: "削除"
    });
    $.__views.__alloyId5.add($.__views.clearEndTime);
    clearTime ? $.__views.clearEndTime.addEventListener("click", clearTime) : __defers["$.__views.clearEndTime!click!clearTime"] = true;
    $.__views.memo = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "300",
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
    $.__views.buttonTabs = Ti.UI.createView({
        height: "45dp",
        backgroundColor: "#fff",
        bottom: "0",
        width: Ti.UI.FILL,
        id: "buttonTabs"
    });
    $.__views.wicon.add($.__views.buttonTabs);
    $.__views.groupButton = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.cancel = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
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
        id: "cancel",
        left: "0",
        title: "キャンセル"
    });
    $.__views.groupButton.add($.__views.cancel);
    $.__views.__alloyId7 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
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
        right: "0",
        title: "保存",
        id: "__alloyId7"
    });
    $.__views.groupButton.add($.__views.__alloyId7);
    saveSchedule ? $.__views.__alloyId7.addEventListener("click", saveSchedule) : __defers["$.__views.__alloyId7!click!saveSchedule"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var get_data, args = arguments[0] || {}, date = args["data"].day.split("-");
    var scheduleDetailModel = Alloy.Collections.schedule_detail;
    Ti.API.selectedIcon = "";
    Ti.API.activeTab = 2;
    if (args["data"].id) {
        scheduleDetailModel.fetch({
            query: "SELECT * from schedule_detail where id=" + args["data"].id
        });
        get_data = scheduleDetailModel.models[0];
        $.title.setValue(get_data.get("title"));
        $.startTime.setText(get_data.get("start_time"));
        $.endTime.setText(get_data.get("end_time"));
        $.memo.setValue(get_data.get("content"));
        Ti.API.selectedIcon = get_data.get("img");
        get_data.get("start_time") ? $.clearStartTime.setVisible(true) : "";
        get_data.get("end_time") ? $.clearEndTime.setVisible(true) : "";
        $.cancel.setTitle("削除");
        $.cancel.type = "delete";
    }
    $.date.setText(date[1] + " / " + date[2]);
    $.dayName.setText(func.convertDayName(new Date(args["data"].day).getDay()));
    func.createBoxIcon($.buttonTabs, $.listIcon, Ti.API.selectedIcon);
    $.edit_event.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.cancel.addEventListener("click", function(e) {
        if ("delete" == e.source.type) {
            Alloy.createModel("schedule_detail", {
                id: args["data"].id
            }).destroy();
            scheduleDetailModel.fetch({
                query: "SELECT * from schedule_detail where id=" + args["data"].id
            });
            scheduleDetailModel.fetch({
                query: "SELECT * from schedule_detail where schedule_id=" + get_data.get("schedule_id")
            });
            0 == scheduleDetailModel.models.length && Alloy.createModel("schedule", {
                id: get_data.get("schedule_id")
            }).destroy();
            delete_view("schedule");
            openView("schedule", {
                date: args["data"].day
            });
        } else openView("schedule");
    });
    __defers["$.__views.__alloyId3!click!timeSet"] && $.__views.__alloyId3.addEventListener("click", timeSet);
    __defers["$.__views.clearStartTime!click!clearTime"] && $.__views.clearStartTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId5!click!timeSet"] && $.__views.__alloyId5.addEventListener("click", timeSet);
    __defers["$.__views.clearEndTime!click!clearTime"] && $.__views.clearEndTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId7!click!saveSchedule"] && $.__views.__alloyId7.addEventListener("click", saveSchedule);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;