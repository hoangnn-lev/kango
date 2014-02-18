function Controller() {
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
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        layout: "vertical",
        id: "main"
    });
    $.__views.friend.add($.__views.main);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        top: "10dp",
        id: "title",
        text: "タップで名前を変更できます"
    });
    $.__views.main.add($.__views.title);
    $.__views.friendList = Ti.UI.createTableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        separatorColor: "#eeeeee",
        id: "friendList"
    });
    $.__views.main.add($.__views.friendList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shiftsCols = Alloy.Collections.shifts;
    shiftsCols.fetch({
        query: "SELECT * from shifts"
    });
    var n = shiftsCols.models.length;
    var shift = shiftsCols.models;
    var row = [];
    for (var i = 0; n > i; i++) {
        var item = Ti.UI.createTableViewRow({
            touchEnabled: false,
            selectionStyle: "none",
            selectedBackgroundColor: "transparent"
        });
        var button = Ti.UI.createButton({
            backgroundColor: shift[i].get("color"),
            width: "80dp",
            height: "30dp",
            left: "10dp",
            top: "10dp",
            bottom: "10dp",
            title: shift[i].get("label"),
            touchEnabled: true,
            id: shift[i].get("id"),
            borderColor: "#f0f0f0",
            color: "#676767",
            borderWidth: 1,
            className: "row-left-name"
        });
        button.addEventListener("click", function(e) {
            openView("shift_detail", {
                id: e.source.id
            });
        });
        item.add(button);
        item.add(Ti.UI.createLabel({
            left: "100dp",
            text: shift[i].get("alias"),
            font: {
                fontSize: "15dp"
            },
            color: "#676767",
            touchEnabled: false,
            className: "row-left-alias"
        }));
        row.push(item);
    }
    $.friendList.setData(row);
    $.friend.addEventListener("android:back", function() {
        openView("schedule");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;