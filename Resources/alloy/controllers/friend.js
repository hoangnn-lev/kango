function Controller() {
    function loadFriend() {
        var friendCols = Alloy.Collections.friend;
        friendCols.fetch({
            query: "SELECT * from friend"
        });
        var n = friendCols.models.length;
        var friend = friendCols.models;
        var row = [];
        for (var i = 0; n > i; i++) {
            var createRow = func.customeRowFriend(friend[i].get("id"), friend[i].get("name"));
            row.push(createRow);
        }
        $.friendList.setData(row);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "friend";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.friend = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "friend"
    });
    $.__views.friend && $.addTopLevelView($.__views.friend);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.friend
    });
    $.__views.tabMenu.setParent($.__views.friend);
    $.__views.main = Ti.UI.createScrollView({
        top: "50dp",
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
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
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
        type: "none",
        title: "編集"
    });
    $.__views.title.add($.__views.edit);
    $.__views.friendList = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "10dp",
        bottom: "10dp",
        separatorColor: "#eeeeee",
        id: "friendList"
    });
    $.__views.main.add($.__views.friendList);
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
        backgroundImage: "/transparent.png",
        id: "groupButton"
    });
    $.__views.friend.add($.__views.groupButton);
    $.__views.uncheck = Ti.UI.createButton({
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
        title: "チェック取り消し",
        left: "10dp",
        id: "uncheck"
    });
    $.__views.groupButton.add($.__views.uncheck);
    $.__views.deleteFriend = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "40%",
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
        title: "削除する",
        right: "10dp",
        id: "deleteFriend"
    });
    $.__views.groupButton.add($.__views.deleteFriend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loadFriend();
    $.friend.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.addFriend.addEventListener("click", function() {
        var name = $.name.getValue();
        $.name.setValue("");
        if (name) {
            var friendModel = Alloy.Collections.friend;
            var friend = Alloy.createModel("friend", {
                name: name
            });
            friendModel.add(friend);
            friend.save();
            $.friendList.appendRow(func.customeRowFriend(friend.get("id"), name));
        }
    });
    $.edit.addEventListener("click", function(e) {
        var bottom = 0;
        if ("none" == e.source.type) $.viewAddFriend.setVisible(false); else {
            $.viewAddFriend.setVisible(true);
            bottom = "-120dp";
        }
        $.groupButton.animate({
            bottom: bottom,
            duration: 200,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        e.source.type = "none" == e.source.type ? "edit" : "none";
        $.name.blur();
    });
    $.deleteFriend.addEventListener("click", function() {
        var items = $.friendList.data[0].rows;
        var checked_items = [];
        if (items) for (var i in items) items[i].check.value && checked_items.push(items[i].value);
        alert(JSON.stringify(checked_items));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;