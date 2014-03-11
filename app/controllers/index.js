var configs = Alloy.Collections.configs;
configs.fetch({
	query : 'select cg_value from configs where cg_name="uid"'
});
if (configs.models.length > 0) {
	Ti.API.UID = configs.models[0].get('cg_value');
	openView('schedule');
} else {
	doRegister();
}

//add back button
$.index.addEventListener('android:back', function(e) {
	Titanium.Android.currentActivity.finish();
});

/*
 * function doRegister
 * action register
 * input : null
 * output : void
 * */
function doRegister() {

	var progressIndicator = Ti.UI.Android.createProgressIndicator({
		message : '処理中。。。',
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
	});
	progressIndicator.show();

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data = JSON.parse(this.responseText);

			if (!data.result) {
				progressIndicator.hide();
				errorRegister(data.msg);
			} else {

				var userData = Alloy.createModel('configs', {
					cg_name : 'uid',
					cg_value : data['data'].id
				});

				configs.add(userData);
				userData.save();
				Ti.API.UID = data['data'].id;
				openView('setting');
				progressIndicator.hide();
			}
		},
		onerror : function(e) {
			progressIndicator.hide();
			errorRegister();
		}
	});
	client.open('POST', Ti.API.KANGO_API_REGISTER);
	client.send({
		device_uid : Titanium.Platform.id
	});
}

/*
 * function errorRegister
 * show message while register error
 * input : null
 * output : void
 * */
function errorRegister(msg) {
	Ti.UI.createAlertDialog({
		buttonNames : ['OK'],
		message : msg ? msg : '登録の処理中にエラーが発生しました。',
		title : 'お知らせ'
	}).show();
}
