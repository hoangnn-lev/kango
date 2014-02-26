function Controller() {
    function saveSchedule() {}
    function cancelEditSchulde() {
        openView("schedule");
    }
    function getListScheduleByDate() {
        scheduleModel.fetch({
            query: 'SELECT * from schedule where _date =  "' + Ti.API.day + '"'
        });
        var data = scheduleModel.models;
        if (!data[0]) return;
        var tableView = Ti.UI.createTableView({
            top: 0,
            height: "auto",
            separatorColor: "#fff"
        });
        tableView.addEventListener("click", function() {
            openView("edit_event");
        });
        var data_list = [];
        data = data[0].toJSON();
        data = JSON.parse(data._schedule);
        for (var i = 0, n = data.length; n > i; ++i) {
            var item = data[i];
            var row = Ti.UI.createTableViewRow({
                title: item.title,
                selectionStyle: "none",
                selectedBackgroundColor: "transparent",
                backgroundColor: "#f0f0f0",
                left: "7dp",
                right: "7dp"
            });
            if (data[i].img) {
                var scheduleTitle = Ti.UI.createLabel({
                    height: Ti.UI.SIZE,
                    top: "10dp",
                    text: item.title,
                    bottom: "10dp",
                    color: "#666",
                    font: {
                        fontSize: "18sp"
                    },
                    touchEnabled: false,
                    left: "30dp"
                });
                row.add(Ti.UI.createImageView({
                    height: "20dp",
                    image: item.img,
                    left: "5dp",
                    touchEnabled: false
                }));
            } else var scheduleTitle = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                top: "10dp",
                text: item.title,
                bottom: "10dp",
                color: "#666",
                font: {
                    fontSize: "18sp"
                },
                left: "5dp",
                touchEnabled: false
            });
            row.add(Ti.UI.createLabel({
                text: "| 20:00",
                font: {
                    fontSize: "18dp"
                },
                touchEnabled: false,
                color: "#666",
                right: "10dp"
            }));
            row.add(scheduleTitle);
            data_list.push(row);
        }
        tableView.setData(data_list);
        $.scheduleList.add(tableView);
    }
    function loadFriend() {
        var row = 2, column = 4, height = "30", top = 0;
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            i > 0 && (top = i * height + 10);
            var view = Ti.UI.createView({
                backgroundColor: "#f19c98",
                height: height + "dp",
                width: "23%",
                left: 25 * j + "%",
                top: top + "dp",
                borderColor: "#666",
                borderWidth: 1
            });
            (0 == i && 1 == j || 1 == i && 2 == j) && view.setBackgroundColor("#efefef");
            view.add(Ti.UI.createLabel({
                text: "Aさん",
                color: "#000",
                font: {
                    fontSize: "16dp"
                }
            }));
            $.friendList.add(view);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "schedule_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.schedule_detail = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "schedule_detail"
    });
    $.__views.schedule_detail && $.addTopLevelView($.__views.schedule_detail);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.schedule_detail
    });
    $.__views.tabMenu.setParent($.__views.schedule_detail);
    $.__views.main = Ti.UI.createView({
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "main"
    });
    $.__views.schedule_detail.add($.__views.main);
    $.__views.top = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        top: "0",
        bottom: 20,
        id: "top",
        layout: "vertical"
    });
    $.__views.main.add($.__views.top);
    $.__views.__alloyId41 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        right: "10dp",
        left: "10dp",
        id: "__alloyId41"
    });
    $.__views.top.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createImageView({
        height: "25dp",
        width: "14dp",
        zIndex: "5",
        top: "10dp",
        bottom: "10dp",
        left: "0",
        image: "/icons/prev.png",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    cancelEditSchulde ? $.__views.__alloyId42.addEventListener("click", cancelEditSchulde) : __defers["$.__views.__alloyId42!click!cancelEditSchulde"] = true;
    $.__views.dateTitle = Ti.UI.createLabel({
        width: "70dp",
        height: "30dp",
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "30%",
        text: "1/30(木)",
        touchEnabled: "false",
        id: "dateTitle"
    });
    $.__views.__alloyId41.add($.__views.dateTitle);
    $.__views.__alloyId43 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: "60dp",
        left: "50%",
        zIndex: 0,
        backgroundColor: "#ffcc33",
        touchEnabled: "false",
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        touchEnabled: "false",
        text: "日勤",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createImageView({
        height: "25dp",
        width: "14dp",
        zIndex: "5",
        top: "10dp",
        bottom: "10dp",
        right: "0",
        image: "/icons/next.png",
        id: "__alloyId45"
    });
    $.__views.__alloyId41.add($.__views.__alloyId45);
    saveSchedule ? $.__views.__alloyId45.addEventListener("click", saveSchedule) : __defers["$.__views.__alloyId45!click!saveSchedule"] = true;
    $.__views.content = Ti.UI.createScrollView({
        top: "45dp",
        bottom: 20,
        left: "10dp",
        right: "10dp",
        id: "content",
        layout: "vertical"
    });
    $.__views.main.add($.__views.content);
    $.__views.friendBlock = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        id: "friendBlock"
    });
    $.__views.content.add($.__views.friendBlock);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: 0,
        left: "0",
        text: "勤務メンバー",
        id: "__alloyId46"
    });
    $.__views.friendBlock.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: 0,
        right: "0",
        text: "メンバーを編集する",
        id: "__alloyId47"
    });
    $.__views.friendBlock.add($.__views.__alloyId47);
    $.__views.friendList = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "25dp",
        id: "friendList"
    });
    $.__views.friendBlock.add($.__views.friendList);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: "0",
        text: "メモ",
        top: "10dp",
        id: "__alloyId48"
    });
    $.__views.content.add($.__views.__alloyId48);
    $.__views.memo = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: "80dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff",
        maxLength: "120",
        id: "memo",
        hintText: "メモ"
    });
    $.__views.content.add($.__views.memo);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: "0",
        text: "文字量が多すぎます（最大●文字）",
        id: "__alloyId49"
    });
    $.__views.content.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp",
        id: "__alloyId50"
    });
    $.__views.content.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: 0,
        text: "1/30(木)の予定",
        left: "0",
        id: "__alloyId51"
    });
    $.__views.__alloyId50.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: 0,
        text: "予定を追加する",
        right: "0",
        id: "__alloyId52"
    });
    $.__views.__alloyId50.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createView({
        backgroundColor: "#ffbf00",
        width: Ti.UI.FILL,
        top: "5dp",
        height: "1sp",
        id: "__alloyId53"
    });
    $.__views.content.add($.__views.__alloyId53);
    $.__views.scheduleList = Ti.UI.createView({
        id: "scheduleList",
        height: Ti.UI.SIZE
    });
    $.__views.content.add($.__views.scheduleList);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: "5dp",
        zIndex: "0",
        text: "予定を追加する",
        right: "0",
        id: "__alloyId54"
    });
    $.__views.content.add($.__views.__alloyId54);
    $.__views.groupButton = Ti.UI.createView({
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId55 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#d1463f",
        backgroundFocusedColor: "#c2433d",
        backgroundSelectedColor: "#c2433d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: 0,
        left: "0",
        title: "キャンセル",
        id: "__alloyId55"
    });
    $.__views.groupButton.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#4bcd61",
        backgroundFocusedColor: "#48c25d",
        backgroundSelectedColor: "#48c25d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: 0,
        right: "0",
        title: "保存する",
        id: "__alloyId56"
    });
    $.__views.groupButton.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#afd7e3",
        backgroundFocusedColor: "#69c0db",
        backgroundSelectedColor: "#69c0db",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "50dp",
        title: "保存して次の日の予定を入力",
        id: "__alloyId57"
    });
    $.__views.groupButton.add($.__views.__alloyId57);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var scheduleModel = Alloy.Collections.schedule;
    $.schedule_detail.addEventListener("android:back", function() {
        openView("schedule");
    });
    getListScheduleByDate();
    loadFriend();
    __defers["$.__views.__alloyId42!click!cancelEditSchulde"] && $.__views.__alloyId42.addEventListener("click", cancelEditSchulde);
    __defers["$.__views.__alloyId45!click!saveSchedule"] && $.__views.__alloyId45.addEventListener("click", saveSchedule);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;