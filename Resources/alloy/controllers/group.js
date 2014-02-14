function Controller() {
    function openMenu() {
        $.listFriend.removeAllChildren();
        $.usrId.blur();
        $.leftMenu.animate({
            left: "0",
            duration: duration,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        flg = true;
        $.main.animate({
            opacity: .3,
            duration: duration
        });
        var activityIndicator = Ti.UI.createActivityIndicator({
            font: {
                fontSize: "20sp"
            },
            message: " Loading...",
            top: 30,
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL
        });
        $.listFriend.add(activityIndicator);
        activityIndicator.show();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var friendResult = JSON.parse(this.responseText);
                friendResult["data"] && createListFriend(friendResult["data"]);
                activityIndicator.hide();
            },
            onerror: function() {
                errorCreateHTTP();
                activityIndicator.hide();
            }
        });
        client.open("POST", Ti.API.KANGO_API_FRIEND_LIST);
        client.send({
            uid: Ti.API.UID["id"]
        });
    }
    function closeMenu() {
        $.leftMenu.animate({
            left: "-80%",
            duration: duration,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        flg = false;
        $.main.animate({
            opacity: 1,
            duration: duration
        });
    }
    function sendRequestAddFriend(data) {
        var progressIndicator = Ti.UI.Android.createProgressIndicator({
            message: "処理中。。。",
            location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
            type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
        });
        progressIndicator.show();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.UI.createAlertDialog({
                    title: "友達招待",
                    buttonNames: [ "はい" ],
                    message: data.name + "さんに友達申請しました。"
                }).show();
                progressIndicator.hide();
            },
            onerror: function() {
                errorCreateHTTP();
                progressIndicator.hide();
            }
        });
        client.open("POST", Ti.API.KANGO_API_REQUEST_FRIEND);
        client.send({
            uid: Ti.API.UID.id,
            fid: data.id
        });
    }
    function editFriend(e, thisRow) {
        var rowClick = e;
        var dialog = Ti.UI.createAlertDialog({
            title: e.source.title + "さん",
            buttonNames: [ "OK", "削除" ],
            message: "UID " + e.source.id
        });
        dialog.addEventListener("click", function(e) {
            if (1 == e.index) {
                var progressIndicator = Ti.UI.Android.createProgressIndicator({
                    message: "処理中。。。",
                    location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                    type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
                });
                progressIndicator.show();
                var client = Ti.Network.createHTTPClient({
                    onload: function() {
                        progressIndicator.hide();
                    },
                    onerror: function() {
                        errorCreateHTTP();
                        progressIndicator.hide();
                    }
                });
                client.open("POST", Ti.API.KANGO_API_REMOVE_FRIEND);
                client.send({
                    uid: Ti.API.UID.id,
                    fid: rowClick.source.id
                });
                thisRow.deleteRow(rowClick.index);
            }
        });
        dialog.show();
    }
    function errorCreateHTTP() {
        Ti.UI.createAlertDialog({
            buttonNames: [ "OK" ],
            message: "エラーが発生しました！",
            title: "お知らせ"
        }).show();
    }
    function createUserSearchResult(data) {
        var viewResult = Ti.UI.createView({
            top: "10dp",
            left: "10dp",
            bottom: "10dp",
            right: "10dp"
        });
        viewResult.add(Ti.UI.createImageView({
            image: "/icons/user.png",
            height: "48dp",
            left: 0
        }));
        viewResult.add(Ti.UI.createLabel({
            text: data["data"].name,
            textAlign: "left",
            width: Ti.UI.SIZE,
            left: "50dp",
            font: {
                fontSize: "20sp"
            },
            color: "#666"
        }));
        if (1 == data["data"].isFriend) viewResult.add(Ti.UI.createLabel({
            text: "友達",
            right: 0,
            color: "#ff3974",
            font: {
                fontSize: "18sp"
            }
        })); else if (data["data"].id != Ti.API.UID.id) {
            var btn = Ti.UI.createButton({
                title: "追加",
                right: 0,
                backgroundColor: "#36b000",
                backgroundFocusedColor: "#e4f7ff",
                backgroundSelectedColor: "#e4f7ff",
                color: "#fff",
                border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                borderRadius: 10,
                font: {
                    fontSize: "18sp"
                }
            });
            btn.addEventListener("click", function() {
                sendRequestAddFriend(data["data"]);
                this.hide();
            });
            viewResult.add(btn);
        }
        $.searchResult.add(viewResult);
        viewResult = null;
    }
    function createListFriend(friendResult) {
        var friend = [];
        var friendTableView = Ti.UI.createTableView();
        var imgUser = Ti.UI.createImageView({
            image: "/icons/user.png",
            height: "32dp",
            left: 0
        });
        for (var i = 0, n = friendResult.length; n > i; ++i) {
            var row = Ti.UI.createTableViewRow({
                title: friendResult[i].name,
                id: friendResult[i].id
            });
            row.add(imgUser);
            row.add(Ti.UI.createLabel({
                left: 0,
                text: friendResult[i].name,
                height: Ti.UI.SIZE,
                top: "5dp",
                bottom: "5dp",
                color: "#666",
                left: "35dp",
                font: {
                    fontSize: "20sp"
                }
            }));
            friend.push(row);
        }
        friendTableView.addEventListener("click", function(e) {
            editFriend(e, this);
        });
        friendTableView.setData(friend);
        $.listFriend.add(friendTableView);
    }
    function messageContent() {
        var str;
        str = "こんにちは、”" + Ti.API.UID.name + "”です。無料の共有カレンダーアプリ「ちむすけ」を始めたよ！\n\n";
        str += "「ちむすけ」ならスケジュールの共有が簡単にできるから、友だちになってね！\n";
        str += "「ちむすけ」についてはここに詳しく書いてあるので、ダウンロードしてみてね。\n";
        str += "http://kango.co.jp\n\n";
        str += "※iPhone・iPad・Androidで利用可能です。\n\n";
        str += "★友だちになるには、「ちむすけ」に登録後、お使いの端末から下のリンクをクリック！\n\n";
        str += "http://kango.dev.leverages.vn/FriendRequest/?user_id=" + Ti.API.UID.id + "\n\n";
        str += "お友達のIDを聞いて、アプリ内から検索して追加する方法の２通りあるよ^^\n\n";
        str += "ちむすけについてお問い合わせは\n";
        str += "ちむすけ運営　support@kango.co.jp　まで";
        return str;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "group";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.group = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "group"
    });
    $.__views.group && $.addTopLevelView($.__views.group);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.group
    });
    $.__views.tabMenu.setParent($.__views.group);
    $.__views.leftMenu = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "80%",
        backgroundColor: "#f3f3f3",
        left: "-80%",
        zIndex: 3,
        id: "leftMenu",
        layout: "vertical"
    });
    $.__views.group.add($.__views.leftMenu);
    $.__views.__alloyId14 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: 0,
        backgroundColor: "#ff3974",
        id: "__alloyId14"
    });
    $.__views.leftMenu.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        text: "友達一覧",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.closeMenu = Ti.UI.createImageView({
        right: "5dp",
        width: "30dp",
        top: "5dp",
        bottom: "5dp",
        zIndex: "5",
        height: "30dp",
        image: "/icons/closeLeftMenu.png",
        id: "closeMenu"
    });
    $.__views.__alloyId14.add($.__views.closeMenu);
    closeMenu ? $.__views.closeMenu.addEventListener("click", closeMenu) : __defers["$.__views.closeMenu!click!closeMenu"] = true;
    $.__views.listFriend = Ti.UI.createView({
        height: "auto",
        width: Ti.UI.FILL,
        id: "listFriend",
        left: "5dp",
        right: "5dp",
        top: "0"
    });
    $.__views.leftMenu.add($.__views.listFriend);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.group.add($.__views.main);
    $.__views.__alloyId16 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId16"
    });
    $.__views.main.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "20dp",
        right: "20dp",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.openMenu = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        top: "5dp",
        bottom: "5dp",
        height: "30dp",
        zIndex: "5",
        image: "/icons/openLeftMenu.png",
        id: "openMenu",
        left: "0"
    });
    $.__views.__alloyId17.add($.__views.openMenu);
    openMenu ? $.__views.openMenu.addEventListener("click", openMenu) : __defers["$.__views.openMenu!click!openMenu"] = true;
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        text: "共有",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createScrollView({
        top: "40dp",
        bottom: 20,
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.main.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "30dp",
        layout: "vertical",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        text: "送る方法を選ぶ",
        zIndex: "0",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#eee",
        id: "__alloyId22"
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.inviteFriendByEmail = Ti.UI.createImageView({
        image: "/icons/email.png",
        width: "50dp",
        height: "50dp",
        zIndex: "3",
        id: "inviteFriendByEmail",
        left: "0"
    });
    $.__views.__alloyId22.add($.__views.inviteFriendByEmail);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        text: "OR",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.inviteFriendByLine = Ti.UI.createImageView({
        width: "50dp",
        height: "50dp",
        id: "inviteFriendByLine",
        image: "/icons/line.png",
        zIndex: "3",
        right: "0"
    });
    $.__views.__alloyId22.add($.__views.inviteFriendByLine);
    $.__views.__alloyId24 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "30dp",
        layout: "vertical",
        id: "__alloyId24"
    });
    $.__views.__alloyId19.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "ユーザーID",
        zIndex: "0",
        bottom: "10dp",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.usrId = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        maxLength: "25",
        hintText: "IDを入力してください。",
        id: "usrId"
    });
    $.__views.__alloyId26.add($.__views.usrId);
    $.__views.searchUsr = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "20sp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        title: "検索",
        top: "7dp",
        id: "searchUsr",
        right: "5dp"
    });
    $.__views.__alloyId26.add($.__views.searchUsr);
    $.__views.searchResult = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#f8ecee",
        top: "20dp",
        id: "searchResult"
    });
    $.__views.__alloyId24.add($.__views.searchResult);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var duration = 200;
    var flg = false;
    $.inviteFriendByEmail.addEventListener("click", function() {
        this.animate(Ti.UI.createAnimation({
            width: "60dp",
            height: "60dp",
            duration: 200,
            autoreverse: true
        }));
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type: "vnd.android-dir/mms-sms"
        });
        intent.putExtra("sms_body", messageContent());
        Ti.Android.currentActivity.startActivityForResult(intent, function(activityResult) {
            1 == activityResult.resultCode;
        });
    });
    $.inviteFriendByLine.addEventListener("click", function() {
        this.animate(Ti.UI.createAnimation({
            width: "60dp",
            height: "60dp",
            duration: 200,
            autoreverse: true
        }));
        var result = Ti.Platform.openURL("line://msg/text/" + messageContent());
        result || Ti.UI.createAlertDialog({
            buttonNames: [ "OK" ],
            message: "Lineがインストールされていませんでした。。。",
            title: "お知らせ"
        }).show();
    });
    var progressIndicator;
    $.searchUsr.addEventListener("click", function() {
        $.usrId.blur();
        $.searchResult.removeAllChildren();
        if (!$.usrId.getValue()) return;
        progressIndicator || (progressIndicator = Ti.UI.Android.createProgressIndicator({
            message: "処理中。。。",
            location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
            type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
        }));
        progressIndicator.show();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var data = JSON.parse(this.responseText);
                data["data"].id ? createUserSearchResult(data) : Ti.UI.createAlertDialog({
                    buttonNames: [ "OK" ],
                    message: "このIDのユーザーは見つかりませんでした。",
                    title: "お知らせ"
                }).show();
            },
            onerror: function() {
                errorCreateHTTP();
            }
        });
        client.open("POST", Ti.API.KANGO_API_SEARCH);
        client.send({
            uid: $.usrId.getValue(),
            mid: Ti.API.UID.id
        });
        progressIndicator.hide();
    });
    $.group.addEventListener("android:back", function() {
        flg ? closeMenu() : scheduleView();
    });
    __defers["$.__views.closeMenu!click!closeMenu"] && $.__views.closeMenu.addEventListener("click", closeMenu);
    __defers["$.__views.openMenu!click!openMenu"] && $.__views.openMenu.addEventListener("click", openMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;