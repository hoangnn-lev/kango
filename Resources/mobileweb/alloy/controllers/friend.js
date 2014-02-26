function Controller() {
    function editFriend() {
        $.name.blur();
        $.groupButton.animate({
            bottom: on_flag ? "0" : "-120dp",
            duration: 200,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.blockFriend.setLeft(on_flag ? "0" : "-50dp");
        on_flag = !on_flag;
        $.viewAddFriend.setVisible(on_flag);
    }
    function cancelEditing() {
        editFriend();
        var items = $.friendList.data[0].rows;
        if (items) for (var i = items.length - 1; i >= 0; i--) items[i].check.value && items[i].check.setValue(false);
    }
    function loadFriend() {
        var friendCols = Alloy.Collections.friend;
        friendCols.fetch({
            query: "SELECT * from friend"
        });
        var n = friendCols.models.length;
        friendList = friendCols.models;
        var row = [];
        row.push(Ti.UI.createTableView());
        for (var i = 0; n > i; i++) {
            var createRow = customeRowFriend(friendList[i].get("id"), friendList[i].get("name"), friendList[i].get("status"));
            row.push(createRow);
        }
        $.friendList.setData(row);
    }
    function customeRowFriend(id, name, friend_status) {
        friend_status = 0 == friend_status ? false : true;
        var row = Ti.UI.createTableViewRow({
            selectionStyle: "none",
            selectedBackgroundColor: "transparent"
        });
        row.setBackgroundColor(friend_status ? "#fff" : "#f0f0f0");
        row.check = Ti.UI.createSwitch({
            style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
            left: "10dp",
            height: "40dp",
            id: id,
            width: "40dp",
            type: "checkbox",
            className: "checkbox-delete"
        });
        row.check.addEventListener("click", function() {
            var items = $.friendList.data[0].rows;
            if (items) for (var i = items.length - 1; i >= 0; i--) if (items[i].check.value) {
                $.deleteFriend.setEnabled(true);
                $.deleteFriend.setBackgroundColor("#cfba9c");
                return;
            }
            $.deleteFriend.setBackgroundColor("#ccc");
            $.deleteFriend.setEnabled(false);
        });
        row.label = Ti.UI.createTextField({
            left: "50dp",
            height: "40dp",
            width: "160dp",
            value: name,
            id: id,
            font: {
                fontSize: "15dp"
            },
            backgroundColor: "transparent",
            color: "#676767",
            maxLength: 8,
            className: "friend-name"
        });
        row.label.addEventListener("focus", function() {
            on_flag ? "" : cancelEditing();
        });
        row.status = Ti.UI.createButton({
            height: "30dp",
            width: "60dp",
            right: "10dp",
            font: {
                fontSize: "14dp"
            },
            title: friend_status ? "ON" : "OFF",
            friend_status: friend_status,
            backgroundColor: friend_status ? "#f3acbd" : "#ccc",
            color: "#fff",
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            zIndex: "10",
            className: "button-status"
        });
        row.status.addEventListener("click", function(e) {
            var checkStatus = e.source.friend_status;
            row.setBackgroundColor(checkStatus ? "#f0f0f0" : "#fff");
            this.setTitle(checkStatus ? "OFF" : "ON");
            this.setBackgroundColor(checkStatus ? "#ccc" : "#f3acbd");
            e.source.friend_status = !checkStatus;
            var friendModel = Alloy.Collections.friend;
            var data = {
                id: id,
                name: name,
                status: checkStatus ? 0 : 1
            };
            var friend = Alloy.createModel("friend", data);
            friendModel.add(friend);
            friend.save();
            delete_view("schedule");
        });
        row.add(row.check);
        row.add(row.label);
        row.add(row.status);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "friend";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.friend = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "friend"
    });
    $.__views.friend && $.addTopLevelView($.__views.friend);
    $.__views.main = Ti.UI.createScrollView({
        top: 0,
        bottom: 20,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "main"
    });
    $.__views.friend.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        top: "10dp",
        right: "10dp",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.back = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        height: "30dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#676767",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#676767",
        borderWidth: 1,
        id: "back",
        left: "0",
        title: "バック"
    });
    $.__views.title.add($.__views.back);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "80dp",
        text: "勤務メンバー設定",
        id: "__alloyId14"
    });
    $.__views.title.add($.__views.__alloyId14);
    $.__views.edit = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        height: "30dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#676767",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: 0,
        borderColor: "#676767",
        borderWidth: 1,
        id: "edit",
        title: "編集"
    });
    $.__views.title.add($.__views.edit);
    editFriend ? $.__views.edit.addEventListener("click", editFriend) : __defers["$.__views.edit!click!editFriend"] = true;
    $.__views.blockFriend = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "40dp",
        left: "-50dp",
        id: "blockFriend"
    });
    $.__views.main.add($.__views.blockFriend);
    $.__views.friendList = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: 0,
        separatorColor: "#ccc",
        editable: "true",
        id: "friendList"
    });
    $.__views.blockFriend.add($.__views.friendList);
    $.__views.viewAddFriend = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "viewAddFriend"
    });
    $.__views.main.add($.__views.viewAddFriend);
    $.__views.name = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#eeeeee",
        borderWidth: 1,
        color: "#676767",
        left: "10dp",
        right: "10dp",
        maxLength: "8",
        id: "name",
        hintText: "メンバー名　最大8文字まで"
    });
    $.__views.viewAddFriend.add($.__views.name);
    $.__views.addFriend = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "45dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        left: "30dp",
        right: "30dp",
        top: "10dp",
        id: "addFriend",
        title: "＋メンバーを追加"
    });
    $.__views.viewAddFriend.add($.__views.addFriend);
    $.__views.groupButton = Ti.UI.createView({
        height: "120dp",
        width: Ti.UI.FILL,
        bottom: "-120dp",
        backgroundImage: "#fff",
        id: "groupButton"
    });
    $.__views.friend.add($.__views.groupButton);
    $.__views.__alloyId15 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "40%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        shadowColor: "#cc",
        shadowOffset: {
            x: 5,
            y: 5
        },
        title: "チェック取り消し",
        left: "10dp",
        id: "__alloyId15"
    });
    $.__views.groupButton.add($.__views.__alloyId15);
    cancelEditing ? $.__views.__alloyId15.addEventListener("click", cancelEditing) : __defers["$.__views.__alloyId15!click!cancelEditing"] = true;
    $.__views.deleteFriend = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "40%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#ccc",
        backgroundFocusedColor: "#c0ad91",
        backgroundSelectedColor: "#c0ad91",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        shadowColor: "#cc",
        shadowOffset: {
            x: 5,
            y: 5
        },
        title: "削除する",
        enabled: "false",
        babackgroundDisabledColor: "#ccc",
        right: "10dp",
        id: "deleteFriend"
    });
    $.__views.groupButton.add($.__views.deleteFriend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var on_flag = true;
    var friendList;
    loadFriend();
    $.friend.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.back.addEventListener("click", function() {
        openView("schedule");
    });
    $.addFriend.addEventListener("click", function() {
        var name = $.name.getValue();
        $.name.blur();
        $.name.setValue("");
        if (name) {
            var friendModel = Alloy.Collections.friend;
            var friend = Alloy.createModel("friend", {
                name: name,
                status: 1
            });
            friendModel.add(friend);
            friend.save();
            $.friendList.appendRow(customeRowFriend(friend.get("id"), name), 1);
            delete_view("schedule");
        }
    });
    $.deleteFriend.addEventListener("click", function() {
        var items = $.friendList.data[0].rows;
        if (items) for (var i = items.length - 1; i >= 0; i--) if (items[i].check.value) {
            $.friendList.deleteRow(i);
            var rowModel = Alloy.createModel("friend", {
                id: items[i].check.id
            });
            rowModel.destroy();
        }
        delete_view("schedule");
    });
    $.main.addEventListener("click", function() {
        alert("aa");
    });
    __defers["$.__views.edit!click!editFriend"] && $.__views.edit.addEventListener("click", editFriend);
    __defers["$.__views.__alloyId15!click!cancelEditing"] && $.__views.__alloyId15.addEventListener("click", cancelEditing);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;