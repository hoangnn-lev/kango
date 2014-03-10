//create collection configs
Alloy.Collections.configs = Alloy.createCollection('configs');
var configs = Alloy.Collections.configs;

configs.fetch({
	query : 'select cg_value from configs where cg_name="uid"'
});

if (configs.models.length > 0) {
	Ti.API.UID = configs.models[0].get('cg_value');
	openView('schedule');
} else {
	$.index.open();
}

//add back button
$.index.addEventListener('android:back', function(e) {
	Titanium.Android.currentActivity.finish();
});

/*
 * function register
 * action register
 * input : null
 * output : void
 * */
function register(e) {

	var error = null;
	var pass = $.password.getValue().trim();
	var email = $.email.getValue();

	if ($.fullname.getValue().trim() == '') {
		alert('Please enter name');
	} else if (!func.validateEmail(email)) {
		alert('Email is not valid');
	} else if (pass == '') {
		alert('Please enter password');
	} else if (pass.length < 6) {
		alert('Password is too short');
	} else {
		doRegister();
	}
}

/*
 * function doRegister
 * action register
 * input : null
 * output : void
 * */
function doRegister() {

	//hidden keyboard
	$.fullname.blur();
	$.email.blur();
	$.password.blur();

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

							var confirm = Ti.UI.createAlertDialog({
								title : 'お知らせ',
								message : 'アカウントの登録に成功しました！',
								buttonNames : ['OK']
							});
							confirm.addEventListener('click', function(e) {
								openView('setting');
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
					email : $.email.getValue(),
					password : Titanium.Utils.md5HexDigest($.password.getValue()),
					reg_id : reg_id
				});
			}
		},
		error : function(e) {
			errorRegister();
			progressIndicator.hide();
		}
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
