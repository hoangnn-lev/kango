Ti.include('activityScreen.js');

//config tabmenu
Ti.API.TABMENU = [{
	img : '/tabmenu/shift.png',
	action : 'shift',
	text:'シフト入力'
}, {
	img : '/tabmenu/schedule.png',
	action : 'schedule',
	text:'月カレンダー'
}, {
	img : '/tabmenu/share.png',
	action : 'share',
	text:'シフト共有'
}, {
	img : '/tabmenu/setting.png',
	action : 'setting',
	text:'その他'
}];

Ti.API.ICON = [{
	title : '履歴',
	folder : '/memo/history/',
	icons : ['3.png', '1.png']
}, {
	title : '記号',
	folder : '/memo/symbol/',
	icons : ['001.png','002.png','003.png','004.png','005.png','006.png','007.png','008.png','009.png','010.png','011.png','012.png','013.png','014.png','015.png','016.png','017.png','018.png','019.png','020.png']
},  {
	title : '性別/ママ',
	folder : '/memo/sex_mom/',
	icons : ['6.png']
}, {
	title : '仕事/学校',
	folder : '/memo/work_school/',
	icons : ['7.png']
}];

Ti.API.KANGO = 'http://kango.dev.leverages.vn/';
Ti.API.KANGO_API_REGISTER = Ti.API.KANGO + 'users/register.json';
Ti.API.KANGO_API_SEARCH = Ti.API.KANGO + 'users/search.json';
Ti.API.KANGO_API_FRIEND_LIST = Ti.API.KANGO + 'users/friendList.json';
Ti.API.KANGO_API_REMOVE_FRIEND = Ti.API.KANGO + 'users/removeFriend.json';
Ti.API.KANGO_API_ADD_FRIEND = Ti.API.KANGO + 'users/addFriend.json';
Ti.API.KANGO_API_REQUEST_FRIEND = Ti.API.KANGO + 'users/sendRequestFriend.json';
Ti.API.KANGO_API_UPDATE_REQUEST_FRIEND = Ti.API.KANGO + 'users/updateRequestFriend.json';
Ti.API.KANGO_API_CHECK_REQUEST_FRIEND = Ti.API.KANGO + 'users/checkRequestFriend.json';
Ti.API.KANGO_API_CHANGE_NAME = Ti.API.KANGO + 'users/changeName.json';

