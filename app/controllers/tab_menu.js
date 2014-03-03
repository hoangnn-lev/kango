var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
var activeTab;
var menu = Ti.API.TABMENU;

for (var i = 0, n = menu.length; i < n; i++) {

	var menuItemWidth = deviceWidth / n;

	activeTab = i + 1;

	var button = Ti.UI.createImageView({
		width :'25%',
		height : '50dp',
		image : menu[i].img,
		action : menu[i].action,
		tab : activeTab	});

	if (!Ti.API.activeTab && i == 1) {
		Ti.API.activeTab = activeTab;
		button.setImage(menu[i].img_active);

	} else if (Ti.API.activeTab && (i + 1) == Ti.API.activeTab) {
		button.setImage(menu[i].img_active);
	}

	button.addEventListener('click', function(e) {
		Ti.API.activeTab = e.source.tab;
		openView(e.source.action);
	});

	$.tabMenu.add(button);
}

