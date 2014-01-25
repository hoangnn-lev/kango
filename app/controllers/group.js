//set activetab
//$.tabMenu.getView('friend').setImage(Ti.API.TABMENU['friend_active']);

//time slide
var duration = 200;
var flg = false;

//add event send mail when click email button
$.inviteFriendByEmail.addEventListener('click', function(e) {

	this.animate(Ti.UI.createAnimation({
		width : '60dp',
		height : '60dp',
		duration : 200,
		autoreverse : true
	}));

	var intent = Ti.Android.createIntent({
		action : Ti.Android.ACTION_VIEW,
		type : 'vnd.android-dir/mms-sms'
	});
	intent.putExtra('sms_body', messageContent());

	Ti.Android.currentActivity.startActivityForResult(intent, function(activityResult) {
		if (activityResult.resultCode == 1) {
			//send sms succsessfull
		}
	});

});

//add event invite friend by line
$.inviteFriendByLine.addEventListener('click', function(e) {
	this.animate(Ti.UI.createAnimation({
		width : '60dp',
		height : '60dp',
		duration : 200,
		autoreverse : true
	}));
	var result = Ti.Platform.openURL('line://msg/text/' + messageContent());
	if (!result) {
		Ti.UI.createAlertDialog({
			buttonNames : ['OK'],
			message : 'Lineがインストールされていませんでした。。。',
			title : 'お知らせ'
		}).show();
	}
});

var progressIndicator;
//close keyboard and search friend
$.searchUsr.addEventListener('click', function(e) {

	$.usrId.blur();
	$.searchResult.removeAllChildren();

	//check input user id
	if (!$.usrId.getValue()) {
		return;
	}

	if (!progressIndicator) {
		progressIndicator = Ti.UI.Android.createProgressIndicator({
			message : '処理中。。。',
			location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
			type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
		});
	}

	progressIndicator.show();

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data = JSON.parse(this.responseText);

			//user id not found
			if (!data['data'].id) {
				Ti.UI.createAlertDialog({
					buttonNames : ['OK'],
					message : 'このIDのユーザーは見つかりませんでした。',
					title : 'お知らせ'
				}).show();
			} else {
				//user found
				createUserSearchResult(data);
			}
		},
		onerror : function(e) {
			errorCreateHTTP();
		}
	});
	client.open('POST', Ti.API.KANGO_API_SEARCH);
	client.send({
		uid : $.usrId.getValue(),
		mid : Ti.API.UID.id
	});
	progressIndicator.hide();
});

/*
 * function openMenu
 * open menu friend list
 * input : null
 * output : void
 * */
function openMenu(e) {
	$.listFriend.removeAllChildren();
	$.usrId.blur();
	$.leftMenu.animate({
		left : '0',
		duration : duration,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	flg = true;
	$.main.animate({
		opacity : 0.3,
		duration : duration
	});

	//show loading proccess

	var activityIndicator = Ti.UI.createActivityIndicator({
		font : {
			fontSize : '20sp'
		},
		message : ' Loading...',
		top : 30,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	$.listFriend.add(activityIndicator);

	activityIndicator.show();
	//load friend list
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var friendResult = JSON.parse(this.responseText);

			if (friendResult['data']) {
				createListFriend(friendResult['data']);
			}
			activityIndicator.hide();
		},
		onerror : function(e) {
			errorCreateHTTP();
			activityIndicator.hide();
		}
	});
	client.open('POST', Ti.API.KANGO_API_FRIEND_LIST);
	client.send({
		uid : Ti.API.UID['id']
	});

}

/*
 * function closeMenu
 * close menu friend list
 * input : null
 * output : void
 * */
function closeMenu(e) {
	$.leftMenu.animate({
		left : '-80%',
		duration : duration,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	flg = false;
	$.main.animate({
		opacity : 1,
		duration : duration
	});
}

//add swipe left right for calendar
// $.friend.addEventListener('swipe', function(e) {
// if (e.direction == 'down') {
// $.usrId.blur();
// } else if (e.direction == 'right') {
// if (!flg)
// openMenu();
// } else if (e.direction == 'left') {
// if (flg)
// closeMenu();
// }
// });

//add back button
$.group.addEventListener('android:back', function(e) {
	if (flg)
		closeMenu();
	else
		scheduleView();
});

/*
 * function sendRequestAddFriend
 * send message add friend
 * input : null
 * output : void
 * */
function sendRequestAddFriend(data) {
	var progressIndicator = Ti.UI.Android.createProgressIndicator({
		message : '処理中。。。',
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
	});
	progressIndicator.show();
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.UI.createAlertDialog({
				title : '友達招待',
				buttonNames : ['はい'],
				message : data.name + 'さんに友達申請しました。'
			}).show();
			progressIndicator.hide();
		},
		onerror : function(e) {
			errorCreateHTTP();
			progressIndicator.hide();
		}
	});
	client.open('POST', Ti.API.KANGO_API_REQUEST_FRIEND);
	client.send({
		uid : Ti.API.UID.id,
		fid : data.id
	});

}

/*
 * function editFriend
 * View detail and edit friend
 * input : null
 * output : void
 * */
function editFriend(e, thisRow) {

	var rowClick = e;
	var dialog = Ti.UI.createAlertDialog({
		title : e.source.title + 'さん',
		buttonNames : ['OK', '削除'],
		message : 'UID ' + e.source.id
	});

	dialog.addEventListener('click', function(e) {
		if (e.index == 1) {
			var progressIndicator = Ti.UI.Android.createProgressIndicator({
				message : '処理中。。。',
				location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
				type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
			});
			progressIndicator.show();

			var client = Ti.Network.createHTTPClient({
				onload : function(e) {
					progressIndicator.hide();
					//var result = JSON.parse(this.responseText);
				},
				onerror : function(e) {
					errorCreateHTTP();
					progressIndicator.hide();
				}
			});
			client.open('POST', Ti.API.KANGO_API_REMOVE_FRIEND);

			client.send({
				uid : Ti.API.UID.id,
				fid : rowClick.source.id
			});
			thisRow.deleteRow(rowClick.index);

		}
	});
	dialog.show();
}

/*
 * function errorCreateHTTP
 * show message while search error
 * input : null
 * output : void
 * */
function errorCreateHTTP() {
	Ti.UI.createAlertDialog({
		buttonNames : ['OK'],
		message : 'エラーが発生しました！',
		title : 'お知らせ'
	}).show();
}

/*
 * function createUserSearchResult
 * create list user search by id
 * input : null
 * output : void
 * */
function createUserSearchResult(data) {
	var viewResult = Ti.UI.createView({
		top : '10dp',
		left : '10dp',
		bottom : '10dp',
		right : '10dp'
	});
	viewResult.add(Ti.UI.createImageView({
		image : '/icons/user.png',
		height : '48dp',
		left : 0
	}));
	viewResult.add(Ti.UI.createLabel({
		text : data['data'].name,
		textAlign : 'left',
		width : Ti.UI.SIZE,
		left : '50dp',
		font : {
			fontSize : '20sp'
		},
		color : "#666",
	}));

	if (data['data'].isFriend == 1) {
		viewResult.add(Ti.UI.createLabel({
			text : '友達',
			right : 0,
			color : '#ff3974',
			font : {
				fontSize : '18sp'
			},
		}));
	} else if (data['data'].id != Ti.API.UID.id) {
		var btn = Ti.UI.createButton({
			title : '追加',
			right : 0,
			backgroundColor : '#36b000',
			backgroundFocusedColor : '#e4f7ff',
			backgroundSelectedColor : '#e4f7ff',
			color : '#fff',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			font : {
				fontSize : '18sp'
			},
		});
		btn.addEventListener('click', function(e) {
			sendRequestAddFriend(data['data']);
			this.hide();
		});
		viewResult.add(btn);
	}
	$.searchResult.add(viewResult);
	viewResult = null;
}

/*
 * function createListFriend
 * create table view list friend
 * input : null
 * output : void
 * */
function createListFriend(friendResult) {

	var friend = [];
	var friendTableView = Ti.UI.createTableView();
	var imgUser = Ti.UI.createImageView({
		image : '/icons/user.png',
		height : '32dp',
		left : 0
	});

	for (var i = 0, n = friendResult.length; i < n; ++i) {

		var row = Ti.UI.createTableViewRow({
			title : friendResult[i].name,
			id : friendResult[i].id,

		});

		row.add(imgUser);
		row.add(Ti.UI.createLabel({
			left : 0,
			text : friendResult[i].name,
			height : Ti.UI.SIZE,
			top : '5dp',
			bottom : '5dp',
			color : '#666',
			left : '35dp',
			font : {
				fontSize : '20sp'
			}
		}));
		friend.push(row);
	}
	friendTableView.addEventListener('click', function(e) {
		editFriend(e, this);
	});

	friendTableView.setData(friend);

	$.listFriend.add(friendTableView);
}

/*
 * function messageContent
 * send sms with message
 * input : null
 * output : void
 * */
function messageContent() {
	var str;
	str = 'こんにちは、”' + Ti.API.UID.name + '”です。無料の共有カレンダーアプリ「ちむすけ」を始めたよ！\n\n';
	str += '「ちむすけ」ならスケジュールの共有が簡単にできるから、友だちになってね！\n';
	str += '「ちむすけ」についてはここに詳しく書いてあるので、ダウンロードしてみてね。\n';
	str += 'http://kango.co.jp\n\n';
	str += '※iPhone・iPad・Androidで利用可能です。\n\n';
	str += '★友だちになるには、「ちむすけ」に登録後、お使いの端末から下のリンクをクリック！\n\n';
	str += 'http://kango.dev.leverages.vn/FriendRequest/?user_id=' + Ti.API.UID.id + '\n\n';
	str += 'お友達のIDを聞いて、アプリ内から検索して追加する方法の２通りあるよ^^\n\n';
	str += 'ちむすけについてお問い合わせは\n';
	str += 'ちむすけ運営　support@kango.co.jp　まで';
	return str;
}

