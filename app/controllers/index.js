//create collection configs
Alloy.Collections.configs = Alloy.createCollection('configs');
var configs = Alloy.Collections.configs;

configs.fetch({
	query : 'select cg_value from configs where cg_name="uid" or cg_name="usrname"'
});

if (configs.models.length > 0) {

	Ti.API.UID = {
		id : configs.models[0].get('cg_value'),
		name : configs.models[1].get('cg_value')
	};

	scheduleView();
} else {
	$.index.open();
}

//add back button
$.index.addEventListener('android:back', function(e) {
	Titanium.Android.currentActivity.finish();
});

//add swipe left right for calendar
// $.index.addEventListener('swipe', function(e) {
	// if (e.direction == 'down') {
		// $.fullname.blur();
		// $.email.blur();
	// }
// });

/*
 * function register
 * action register
 * input : null
 * output : void
 * */
function register(e) {

	var error = null;
	if ($.fullname.getValue()) {
		doRegister();
	} else {
		Ti.UI.createAlertDialog({
			buttonNames : ['OK'],
			message : '名前を入力してください。',
			title : 'お知らせ'
		}).show();
	}
}

/*
 * function doRegister
 * action register
 * input : null
 * output : void
 * */
function doRegister(name) {
	//disable button
	$.register.removeEventListener('click', register);
	//hidden keyboard
	$.fullname.blur();
	$.email.blur();

	var progressIndicator = Ti.UI.Android.createProgressIndicator({
		message : '処理中。。。',
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
	});
	progressIndicator.show();

	gcm.registerC2dm({
		success : function(e) {

			var reg_id = gcm.getRegistrationId();

			//check register c2dm
			if (!reg_id) {
				progressIndicator.hide();
				errorRegister();
			} else {
				var client = Ti.Network.createHTTPClient({
					onload : function(e) {
						var data = JSON.parse(this.responseText);
						if (!data.id) {
							progressIndicator.hide();
							errorRegister();
						} else {

							var userData = Alloy.createModel('configs', {
								cg_name : 'uid',
								cg_value : data.id
							});
							Alloy.Collections.configs.add(userData);
							userData.save();

							userData = Alloy.createModel('configs', {
								cg_name : 'usrname',
								cg_value : data.name
							});
							Alloy.Collections.configs.add(userData);

							userData.save();
							Ti.API.UID = {
								id : data.id,
								name : data.name
							};

							var confirm = Ti.UI.createAlertDialog({
								title : 'お知らせ',
								message : 'アカウントの登録に成功しました！',
								buttonNames : ['OK']
							});
							confirm.addEventListener('click', function(e) {
								scheduleView();
								$.index.close();
							});
							progressIndicator.hide();
							confirm.show();
						}
					},
					onerror : function(e) {
						progressIndicator.hide();
						errorRegister();
					}
				});
				client.open('POST', Ti.API.KANGO_API_REGISTER);
				client.send({
					name : $.fullname.getValue(),
					reg_id : reg_id
				});
			}
		},
		error : function(e) {
			errorRegister();
			progressIndicator.hide();
		},
		callback : function(e) {
		}
	});

}

/*
 * function errorRegister
 * show message while register error
 * input : null
 * output : void
 * */
function errorRegister() {
	Ti.UI.createAlertDialog({
		buttonNames : ['OK'],
		message : '登録の処理中にエラーが発生しました。',
		title : 'お知らせ'
	}).show();
}
