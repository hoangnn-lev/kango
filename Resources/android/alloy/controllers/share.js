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
        layout: "horizontal",
        id: "tabMenu",
        __parentSymbol: $.__views.share
    });
    $.__views.tabMenu.setParent($.__views.share);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        layout: "vertical",
        id: "main"
    });
    $.__views.share.add($.__views.main);
    $.__views.shareImage = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "40%",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        top: 0,
        backgroundImage: "/share/btnShareImage.png",
        backgroundSelectedImage: "/share/btnShareImage_action.png",
        id: "shareImage"
    });
    $.__views.main.add($.__views.shareImage);
    $.__views.shareText = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "40%",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        top: 0,
        backgroundImage: "/share/btnShareTxt.png",
        backgroundSelectedImage: "/share/btnShareTxt_action.png",
        id: "shareText"
    });
    $.__views.main.add($.__views.shareText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.shareImage.addEventListener("click", function() {
        openView("share_by_image");
    });
    $.shareText.addEventListener("click", function() {
        openView("share_by_text");
    });
    $.share.addEventListener("android:back", function() {
        openView("schedule");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;