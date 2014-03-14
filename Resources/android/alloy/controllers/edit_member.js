function Controller() {
    function edit(e) {
        "name" == e.source.idf && $.dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_member";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.edit_member = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "edit_member"
    });
    $.__views.edit_member && $.addTopLevelView($.__views.edit_member);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        layout: "horizontal",
        id: "tabMenu",
        __parentSymbol: $.__views.edit_member
    });
    $.__views.tabMenu.setParent($.__views.edit_member);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.edit_member.add($.__views.main);
    $.__views.__alloyId10 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "__alloyId10"
    });
    $.__views.__alloyId11 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        bottom: "10dp",
        top: "10dp",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: "0",
        text: "メンバー名(最大8文字) ",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 0,
        borderColor: "#fff",
        hintText: "アサコ先輩",
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: "0",
        text: "※文字数が多すぎます",
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    var __alloyId16 = [];
    __alloyId16.push("キャンセル");
    __alloyId16.push("保存する");
    $.__views.dialog = Ti.UI.createAlertDialog({
        androidView: $.__views.__alloyId10,
        buttonNames: __alloyId16,
        id: "dialog",
        title: "お知らせ",
        cancel: "1"
    });
    $.__views.__alloyId10 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "__alloyId10"
    });
    $.__views.dialog.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        bottom: "10dp",
        top: "10dp",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: "0",
        text: "メンバー名(最大8文字) ",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 0,
        borderColor: "#fff",
        hintText: "アサコ先輩",
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: "0",
        text: "※文字数が多すぎます",
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.__alloyId19 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId19"
    });
    $.__views.main.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "タップで名前を変更できます",
        left: "10dp",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.members = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "40dp",
        separatorColor: "#eeeeee",
        id: "members"
    });
    $.__views.main.add($.__views.members);
    edit ? $.__views.members.addEventListener("click", edit) : __defers["$.__views.members!click!edit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var members = [ {
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
    for (var i = 0, n = members.length; n > i; i++) {
        var item = Ti.UI.createTableViewRow({
            touchEnabled: false,
            selectionStyle: "none",
            selectedBackgroundColor: "transparent"
        });
        item.add(Ti.UI.createLabel({
            left: "10dp",
            text: members[i].name,
            color: "#000",
            font: {
                fontSize: "15dp"
            },
            className: "row-left",
            width: Ti.UI.FILL,
            right: "90dp",
            idf: "name"
        }));
        var background = "#4bcd61", text = "使う";
        if (i > 3) {
            background = "#9c9c9c";
            text = "要らない";
        }
        var box = Ti.UI.createView({
            height: "35dp",
            width: "75dp",
            backgroundColor: background,
            right: "10dp",
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            top: "10dp",
            bottom: "10dp",
            className: "box"
        });
        box.add(Ti.UI.createLabel({
            text: text,
            color: "#fff",
            font: {
                fontSize: "15dp"
            },
            className: "row-right",
            idf: "button"
        }));
        item.add(box);
        row.push(item);
    }
    $.members.setData(row);
    __defers["$.__views.members!click!edit"] && $.__views.members.addEventListener("click", edit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;