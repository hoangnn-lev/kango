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
        for (var i = 0; n > i; i++) if ("" == friendList[i].get("name")) Alloy.createModel("friend", {
            id: friendList[i].get("id")
        }).destroy(); else {
            var createRow = customeRowFriend(friendList[i].get("id"), friendList[i].get("name"), friendList[i].get("flag"));
            $.friendList.add(createRow);
        }
    }
    function customeRowFriend(id, name, friend_flag) {
        friend_flag = 0 == friend_flag ? false : true;
        var row = Ti.UI.createView({
            height: Ti.UI.SIZE,
            backgroundColor: "#fff"
        });
        row.label = Ti.UI.createTextField({
            left: "10dp",
            height: "50dp",
            width: "200dp",
            hintText: "名前",
            value: name,
            id: id,
            flag: friend_flag,
            font: {
                fontSize: "15dp"
            },
            backgroundColor: "transparent",
            color: "#000",
            maxLength: 8,
            zIndex: 9,
            className: "friend-name"
        });
        row.label.addEventListener("change", function(e) {
            var data = {
                id: id,
                name: e.source.value,
                flag: 1
            };
            var friendModel = Alloy.Collections.friend;
            var friend = Alloy.createModel("friend", data);
            friendModel.add(friend);
            friend.save();
            delete_view("schedule");
        });
        row.flag = Ti.UI.createButton({
            height: "30dp",
            width: "60dp",
            right: "10dp",
            font: {
                fontSize: "14dp"
            },
            title: friend_flag ? "ON" : "OFF",
            friend_flag: friend_flag,
            backgroundColor: friend_flag ? "#f3acbd" : "#ccc",
            color: "#fff",
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            zIndex: 10,
            textAlign: "center",
            className: "button-flag"
        });
        row.flag.addEventListener("click", function(e) {
            var checkflag = e.source.friend_flag;
            row.flag.setBackgroundColor(checkflag ? "#ccc" : "#f3acbd");
            row.flag.setTitle(checkflag ? "OFF" : "ON");
            e.source.friend_flag = !checkflag;
            var friendModel = Alloy.Collections.friend;
            var data = {
                id: id,
                name: name,
                flag: checkflag ? 0 : 1
            };
            var friend = Alloy.createModel("friend", data);
            friendModel.add(friend);
            friend.save();
            delete_view("schedule");
        });
        row.add(row.label);
        row.add(row.flag);
        row.add(Ti.UI.createLabel({
            backgroundColor: "#eeeeee",
            height: "1sp",
            width: Ti.UI.FILL,
            bottom: 0
        }));
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
        backgroundColor: "#f5f1e9",
        bottom: 0,
        id: "main"
    });
    $.__views.friend.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "勤務メンバー設定",
        id: "__alloyId21"
    });
    $.__views.title.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createScrollView({
        top: "0",
        bottom: 20,
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "__alloyId22"
    });
    $.__views.main.add($.__views.__alloyId22);
    $.__views.friendList = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: 0,
        bottom: "20dp",
        layout: "vertical",
        separatorColor: "#ccc",
        id: "friendList"
    });
    $.__views.__alloyId22.add($.__views.friendList);
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
    $.__views.__alloyId22.add($.__views.addFriend);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var friendList;
    var args = arguments[0] || {};
    loadFriend();
    $.friend.addEventListener("android:back", function() {
        Ti.API.activeTab = args["tab"];
        openView(2 == args["tab"] ? "schedule" : "setting");
    });
    $.addFriend.addEventListener("click", function() {
        if ($.friendList.getChildren().length > 50) {
            alert("人数制限は50人");
            return;
        }
        var friendModel = Alloy.Collections.friend;
        var friend = Alloy.createModel("friend", {
            name: "",
            flag: 1
        });
        friendModel.add(friend);
        friend.save();
        $.friendList.add(customeRowFriend(friend.get("id"), ""), 1);
        delete_view("schedule");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;