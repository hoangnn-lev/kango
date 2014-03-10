exports.friendRequestC2dm = function(data) {
    var fid = data.uid;
    var dialog = Ti.UI.createAlertDialog({
        title: "友達申請",
        message: data.message,
        buttonNames: [ "承認", "キャンセル" ]
    });
    dialog.addEventListener("click", function(e) {
        if (0 == e.index) {
            var progressIndicator = Ti.UI.Android.createProgressIndicator({
                message: "処理中。。。",
                location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
            });
            progressIndicator.show();
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    var result = JSON.parse(this.responseText);
                    Ti.UI.createAlertDialog({
                        title: "友達申請",
                        message: result.mess,
                        buttonNames: [ "OK" ]
                    }).show();
                },
                onerror: function() {}
            });
            client.open("POST", Ti.API.KANGO_API_ADD_FRIEND);
            client.send({
                uid: Ti.API.UID,
                fid: fid
            });
            progressIndicator.hide();
        }
    });
    dialog.show();
    var client = Ti.Network.createHTTPClient();
    client.open("POST", Ti.API.KANGO_API_UPDATE_REQUEST_FRIEND);
    client.send({
        uid: Ti.API.UID,
        fid: fid
    });
};

exports.checkFriendRequest = function() {
    var progressIndicator = Ti.UI.Android.createProgressIndicator({
        message: "処理中。。。",
        location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
        type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
    });
    progressIndicator.show();
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            if (result["data"]) {
                var data = result["data"];
                for (var i = 0, n = data.length; n > i; ++i) {
                    var fid = data[i].id;
                    var dialog = Ti.UI.createAlertDialog({
                        title: "友達申請",
                        message: data[i].name + "さんは友達申請を送りました",
                        buttonNames: [ "承認", "キャンセル" ]
                    });
                    dialog.addEventListener("click", function(e) {
                        if (0 == e.index) {
                            progressIndicator.show();
                            var client = Ti.Network.createHTTPClient({
                                onload: function() {
                                    var result = JSON.parse(this.responseText);
                                    Ti.UI.createAlertDialog({
                                        title: "友達申請",
                                        message: result.mess,
                                        buttonNames: [ "OK" ]
                                    }).show();
                                },
                                onerror: function() {}
                            });
                            client.open("POST", Ti.API.KANGO_API_ADD_FRIEND);
                            client.send({
                                uid: Ti.API.UID,
                                fid: fid
                            });
                            progressIndicator.hide();
                        }
                    });
                    dialog.show();
                }
            }
            progressIndicator.hide();
        },
        onerror: function() {
            progressIndicator.hide();
            Ti.UI.createAlertDialog({
                buttonNames: [ "OK" ],
                message: "エラーが発生しました！",
                title: "お知らせ"
            }).show();
        }
    });
    client.open("POST", Ti.API.KANGO_API_CHECK_REQUEST_FRIEND);
    client.send({
        uid: Ti.API.UID
    });
};

exports.addNewFriend = function(data) {
    if (data) {
        var fid = data.substring(31, 52);
        if (fid) {
            var progressIndicator = Ti.UI.Android.createProgressIndicator({
                message: "処理中。。。",
                location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
            });
            progressIndicator.show();
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    var result = JSON.parse(this.responseText);
                    Ti.UI.createAlertDialog({
                        title: "友達申請",
                        message: result.mess,
                        buttonNames: [ "OK" ]
                    }).show();
                }
            });
            client.open("POST", Ti.API.KANGO_API_ADD_FRIEND);
            client.send({
                uid: Ti.API.UID,
                fid: fid
            });
            progressIndicator.hide();
        }
    }
};