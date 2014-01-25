function Controller() {
    function edit(e) {
        "name" == e.source.idf && $.dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "friend_edit";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.friend_edit = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "friend_edit"
    });
    $.__views.friend_edit && $.addTopLevelView($.__views.friend_edit);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "__alloyId0"
    });
    $.__views.__alloyId1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        bottom: "10dp",
        top: "10dp",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "1",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "メンバー名(最大8文字) ",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 0,
        borderColor: "#fff",
        zIndex: "2",
        hintText: "アサコ先輩",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        zIndex: "1",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        text: "※文字数が多すぎます",
        id: "__alloyId4"
    });
    $.__views.__alloyId1.add($.__views.__alloyId4);
    var __alloyId6 = [];
    __alloyId6.push("キャンセル");
    __alloyId6.push("保存する");
    $.__views.dialog = Ti.UI.createAlertDialog({
        androidView: $.__views.__alloyId0,
        buttonNames: __alloyId6,
        id: "dialog",
        title: "お知らせ",
        cancel: "1"
    });
    $.__views.__alloyId0 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "__alloyId0"
    });
    $.__views.dialog.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        bottom: "10dp",
        top: "10dp",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "1",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "メンバー名(最大8文字) ",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 0,
        borderColor: "#fff",
        zIndex: "2",
        hintText: "アサコ先輩",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        zIndex: "1",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        text: "※文字数が多すぎます",
        id: "__alloyId4"
    });
    $.__views.__alloyId1.add($.__views.__alloyId4);
    $.__views.__alloyId9 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId9"
    });
    $.__views.friend_edit.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "タップで名前を変更できます",
        left: "10dp",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.friend = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "50dp",
        separatorColor: "#fff",
        id: "friend"
    });
    $.__views.friend_edit.add($.__views.friend);
    edit ? $.__views.friend.addEventListener("click", edit) : __defers["$.__views.friend!click!edit"] = true;
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.friend_edit
    });
    $.__views.tabMenu.setParent($.__views.friend_edit);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var friend = [ {
        name: "日勤"
    }, {
        name: "夜勤"
    }, {
        name: "休み"
    }, {
        name: "早番"
    }, {
        name: "遅番"
    }, {
        name: "準夜勤"
    }, {
        name: "入り"
    } ];
    var row = [];
    for (var i = 0, n = friend.length; n > i; i++) {
        var item = Ti.UI.createTableViewRow({
            touchEnabled: false,
            selectionStyle: "none",
            selectedBackgroundColor: "transparent"
        });
        item.add(Ti.UI.createLabel({
            left: "10dp",
            text: friend[i].name,
            color: "#666",
            font: {
                fontSize: "18dp"
            },
            top: "10dp",
            bottom: "10dp",
            className: "row-left",
            idf: "name"
        }));
        var color = "#fff", background = "#51b11c", text = "使う";
        if (i > 3) {
            color = "#3c3e40";
            background = "#9c9c9c";
            text = "要らない";
        }
        var box = Ti.UI.createView({
            height: "25dp",
            width: "70dp",
            backgroundColor: background,
            right: "10dp",
            className: "box"
        });
        box.add(Ti.UI.createLabel({
            text: text,
            color: color,
            font: {
                fontSize: "15dp"
            },
            className: "row-right",
            idf: "button"
        }));
        item.add(box);
        row.push(item);
    }
    $.friend.setData(row);
    __defers["$.__views.friend!click!edit"] && $.__views.friend.addEventListener("click", edit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;