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
    $.__views.shareByImage = Ti.UI.createView({
        height: "50%",
        width: Ti.UI.FILL,
        top: 0,
        id: "shareByImage"
    });
    $.__views.main.add($.__views.shareByImage);
    $.__views.shareImage = Ti.UI.createImageView({
        image: "/share/shareByImage.jpg",
        id: "shareImage",
        width: Ti.UI.FILL
    });
    $.__views.shareByImage.add($.__views.shareImage);
    $.__views.shareByText = Ti.UI.createView({
        height: "50%",
        width: Ti.UI.FILL,
        top: 0,
        id: "shareByText"
    });
    $.__views.main.add($.__views.shareByText);
    $.__views.shareText = Ti.UI.createImageView({
        image: "/share/shareByText.jpg",
        id: "shareText",
        width: Ti.UI.FILL
    });
    $.__views.shareByText.add($.__views.shareText);
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