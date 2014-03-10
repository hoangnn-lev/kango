Ti.include('activityScreen.js');

//config tabmenu
Ti.API.TABMENU = [{
	img : '/tabmenu/shift.png',
	action : 'shift',
	img_active : '/tabmenu/shift_active.png'
}, {
	img : '/tabmenu/schedule.png',
	action : 'schedule',
	img_active : '/tabmenu/schedule_active.png'
}, {
	img : '/tabmenu/share.png',
	action : 'share',
	img_active : '/tabmenu/share_active.png'
}, {
	img : '/tabmenu/setting.png',
	action : 'setting',
	img_active : '/tabmenu/setting_active.png'
}];

Ti.API.ICON = [{
	title : '披瀝',
	folder : '/memo/history/',
	icons : ['/memo/private/1.png', '/memo/simple/2.png', '/memo/job/3.png', '/memo/private/4.png']
}, {
	title : 'シンプル',
	folder : '/memo/simple/',
	icons : ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png']
}, {
	title : 'プライベート',
	folder : '/memo/private/',
	icons : ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png']
}, {
	title : '仕事',
	folder : '/memo/job/',
	icons : ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png']
}];

Ti.API.KANGO = 'http://192.168.1.224/kango/';
Ti.API.KANGO_API_REGISTER = Ti.API.KANGO + 'users/register.json';
Ti.API.KANGO_API_SEARCH = Ti.API.KANGO + 'users/search.json';
Ti.API.KANGO_API_FRIEND_LIST = Ti.API.KANGO + 'users/friendList.json';
Ti.API.KANGO_API_REMOVE_FRIEND = Ti.API.KANGO + 'users/removeFriend.json';
Ti.API.KANGO_API_ADD_FRIEND = Ti.API.KANGO + 'users/addFriend.json';
Ti.API.KANGO_API_REQUEST_FRIEND = Ti.API.KANGO + 'users/sendRequestFriend.json';
Ti.API.KANGO_API_UPDATE_REQUEST_FRIEND = Ti.API.KANGO + 'users/updateRequestFriend.json';
Ti.API.KANGO_API_CHECK_REQUEST_FRIEND = Ti.API.KANGO + 'users/checkRequestFriend.json';
Ti.API.KANGO_API_CHANGE_NAME = Ti.API.KANGO + 'users/changeName.json';

