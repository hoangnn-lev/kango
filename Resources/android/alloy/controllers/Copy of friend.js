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
            backgroundColor: "#fff",
            className: "row-friend"
        });
        row.label = Ti.UI.createTextField({
            left: "10dp",
            height: "40dp",
            width: "200dp",
            hintText: "名前",
            value: name,
            id: id,
            font: {
                fontSize: "15dp"
            },
            backgroundColor: "transparent",
            color: "#676767",
            maxLength: 8,
            zIndex: 9,
            className: "friend-name"
        });
        row.label.addEventListener("blur", function(e) {
            alert(e.source.value);
        });
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
            zIndex: 10,
            textAlign: "center",
            className: "button-status"
        });
        row.status.addEventListener("click", function(e) {
            var checkStatus = e.source.friend_status;
            row.status.setBackgroundColor(checkStatus ? "#ccc" : "#f3acbd");
            row.status.setTitle(checkStatus ? "OFF" : "ON");
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
            alert(232);
            return;
        });
        row.add(row.label);
        row.add(row.status);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of friend";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
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