function Controller() {
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
            selectedBackgroundColor: "transparent",
            className: "row-friend"
        });
        row.setBackgroundColor(friend_status ? "#fff" : "#f0f0f0");
        row.label = Ti.UI.createTextField({
            left: "10dp",
            height: "40dp",
            width: Ti.UI.FILL,
            hintText: "Enter name",
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
        row.label.addEventListener("change", function() {});
        row.status = Ti.UI.createButton({
            height: "25dp",
            width: "70dp",
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
    $.__views.friend = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "friend"
    });
    $.__views.friend && $.addTopLevelView($.__views.friend);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        backgroundColor: "#fff9e6",
        bottom: 0,
        id: "main"
    });
    $.__views.friend.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "勤務メンバー設定",
        id: "__alloyId14"
    });
    $.__views.title.add($.__views.__alloyId14);
    $.__views.friendList = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: 0,
        bottom: "120dp",
        separatorColor: "#ccc",
        editable: "true",
        id: "friendList"
    });
    $.__views.main.add($.__views.friendList);
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
        bottom: "20dp",
        id: "addFriend",
        title: "＋メンバーを追加"
    });
    $.__views.friend.add($.__views.addFriend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var friendList;
    loadFriend();
    $.friend.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.addFriend.addEventListener("click", function() {
        if ($.friendList.data[0] && $.friendList.data[0].rows.length > 50) {
            alert("You can add max 50 friend");
            return;
        }
        var friendModel = Alloy.Collections.friend;
        var friend = Alloy.createModel("friend", {
            name: "",
            status: 1
        });
        friendModel.add(friend);
        friend.save();
        $.friendList.appendRow(customeRowFriend(friend.get("id"), ""), 1);
        delete_view("schedule");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;