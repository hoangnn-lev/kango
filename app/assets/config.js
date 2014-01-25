Ti.include('activityScreen.js');

//config tabmenu
Ti.API.TABMENU = [{
	img : '/tabmenu/schedule.png',
	action : 'schedule',
	text:'ホーム'
}, {
	img : '/tabmenu/shift.png',
	action : 'shift',
	text:'シフト'
}, {
	img : '/tabmenu/group.png',
	action : 'group',
	text:'グループ'
}, {
	img : '/tabmenu/setting.png',
	action : 'setting',
	text:'設定'
}];

Ti.API.ICON = [{
	title : '履歴',
	folder : '/memo/history/',
	icons : ['3.png', '1.png']
}, {
	title : '記号',
	folder : '/memo/symbol/',
	icons : ['2.png', '5.png']
}, {
	title : 'イベント',
	folder : '/memo/event/',
	icons : ['1.png', '2.png', '3.png', '4.png', '5.png']
}, {
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

