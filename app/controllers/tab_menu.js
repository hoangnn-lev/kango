var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);

$.tabMenu.setTop(top - 75 + 'dp');

$.schedule.addEventListener('click', function(e) {
	scheduleView();
});

$.setting.addEventListener('click', function(e) {
	settingView();
});

$.friend.addEventListener('click', function(e) {
	friendView();
});

