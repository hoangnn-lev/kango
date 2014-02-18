function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "share";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.share = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "share"
    });
    $.__views.share && $.addTopLevelView($.__views.share);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.share
    });
    $.__views.tabMenu.setParent($.__views.share);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.share.add($.__views.main);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "10dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "20dp",
        color: "#000",
        textAlign: "left",
        font: {
            fontSize: "16sp"
        },
        top: "20dp",
        zIndex: 0,
        bottom: "0",
        text: "どの方法で予定を共有しますか",
        id: "__alloyId62"
    });
    $.__views.content.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "画像で送る",
        id: "__alloyId63"
    });
    $.__views.content.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "文章で送る",
        id: "__alloyId64"
    });
    $.__views.content.add($.__views.__alloyId64);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;